import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCareers } from '../hooks/useCareers.js'
import useAppStore from '../store/useAppStore.js'
import { getMatchPercentage } from '../utils/scoring.js'
import { compareCareers } from '../api/careersApi'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import CareerDrawer from '../components/career/CareerDrawer.jsx'
import CompareOverlay from '../components/career/CompareOverlay.jsx'
import Icon from '../components/ui/Icon.jsx'
import SageAvatar from '../components/tour/SageAvatar.jsx'

// SPACIOUS TREE: Clusters spread wide to prevent inter-cluster overlap
const CLUSTER_NODES = [
  { id: "Technology & Data",     label: "Technology\n& Data",     x: 250,  y: 900,  color: "#2563EB", branchAngle: 210, icon: "memory" },
  { id: "Science & Health",      label: "Science\n& Health",      x: 550,  y: 550,  color: "#16A34A", branchAngle: 235, icon: "science" },
  { id: "Physical & Outdoors",   label: "Physical\n& Outdoors",   x: 950,  y: 350,  color: "#0891B2", branchAngle: 260, icon: "fitness_center" },
  { id: "Business & Law",        label: "Business\n& Law",        x: 1350, y: 350,  color: "#D97706", branchAngle: 280, icon: "account_balance" },
  { id: "Creative & Expression", label: "Creative\n& Expression", x: 1750, y: 550,  color: "#9333EA", branchAngle: 305, icon: "palette" },
  { id: "People & Society",      label: "People\n& Society",      x: 2050, y: 900,  color: "#E8572A", branchAngle: 330, icon: "groups" },
]

// Seeded pseudo-random for deterministic organic jitter
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

// Push overlapping nodes apart until no circles overlap
function resolveOverlaps(nodes, minDist = 95) {
  const resolved = nodes.map(n => ({ ...n }))
  for (let iter = 0; iter < 15; iter++) {
    let moved = false
    for (let i = 0; i < resolved.length; i++) {
      for (let j = i + 1; j < resolved.length; j++) {
        const dx = resolved[j].cx - resolved[i].cx
        const dy = resolved[j].cy - resolved[i].cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist && dist > 0) {
          const overlap = (minDist - dist) / 2 + 2
          const nx = dx / dist
          const ny = dy / dist
          resolved[i].cx -= nx * overlap
          resolved[i].cy -= ny * overlap
          resolved[j].cx += nx * overlap
          resolved[j].cy += ny * overlap
          moved = true
        }
      }
    }
    if (!moved) break
  }
  return resolved
}

function getOrganicBranch(x1, y1, x2, y2) {
  const midY = y1 - (y1 - y2) * 0.4
  return `M ${x1} ${y1} Q ${x1} ${midY}, ${x2} ${y2}`
}

export default function PathMap() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useCareers()
  const careers = data?.careers || []
  
  const quizAnswers = useAppStore(s => s.quizAnswers)
  const customAnswers = useAppStore(s => s.customAnswers)
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const selectedCareer = useAppStore(s => s.selectedCareer)
  const setSelectedCareer = useAppStore(s => s.setSelectedCareer)
  const profile = useAppStore(s => s.profile)
  
  const enterCompareMode = useAppStore(s => s.enterCompareMode)
  const exitCompareMode = useAppStore(s => s.exitCompareMode)
  const toggleCompareSelection = useAppStore(s => s.toggleCompareSelection)
  const compareSelections = useAppStore(s => s.compareSelections)
  const compareMode = useAppStore(s => s.compareMode)
  const compareResult = useAppStore(s => s.compareResult)
  const setCompareResult = useAppStore(s => s.setCompareResult)
  const setCompareLoading = useAppStore(s => s.setCompareLoading)
  const compareLoading = useAppStore(s => s.compareLoading)
  const isMinimalData = useAppStore(s => s.isMinimalData)

  const [hoveredCluster, setHoveredCluster] = useState(null)
  const [hoveredCareer, setHoveredCareer] = useState(null)
  const [filterMode, setFilterMode] = useState(quizCompleted ? 'for-you' : 'all')
  const [search, setSearch] = useState('')
  const [expandedCluster, setExpandedCluster] = useState(null)

  const [zoom, setZoom] = useState(0.9) 
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const svgRef = useRef(null)
  const mapContainerRef = useRef(null)
  const compareInFlight = useRef(false)

  const handleZoom = useCallback((delta) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 3))
  }, [])

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleZoom])

  const startPan = (e) => { if (e.button !== 0) return; setIsDragging(true); dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; }
  const onPan = (e) => { if (!isDragging) return; setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }); }
  const endPan = () => setIsDragging(false)
  const resetView = () => { setZoom(0.9); setPan({ x: 0, y: 0 }); }

  const handleRunComparison = async () => {
    if (compareSelections.length !== 2) return
    if (compareInFlight.current) return  // Prevent double-fire
    
    compareInFlight.current = true
    setCompareLoading(true)
    try {
      const result = await compareCareers(compareSelections[0], compareSelections[1])
      setCompareResult(result)
      // Tour: mark compare as used
      useAppStore.getState().setCompareUsed(true)
    } catch (err) {
      console.error('[compare]', err)
      toast.error('Could not generate comparison. Please try again.', { id: 'compare-error' })
    } finally {
      setCompareLoading(false)
      compareInFlight.current = false
    }
  }

  // Smoothly navigate to a specific node
  const navigateToNode = useCallback((targetX, targetY) => {
    const container = svgRef.current?.parentElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    const targetZoom = 1.6
    // Center the node in the viewport, accounting for SVG viewBox mapping
    const svgW = 2500, svgH = 1800, svgX0 = -100, svgY0 = -100
    const scaleX = rect.width / svgW, scaleY = rect.height / svgH
    const scale = Math.min(scaleX, scaleY)
    const mappedX = (targetX - svgX0) * scale
    const mappedY = (targetY - svgY0) * scale
    const newPanX = rect.width / 2 - mappedX * targetZoom
    const newPanY = rect.height / 2 - mappedY * targetZoom
    setZoom(targetZoom)
    setPan({ x: newPanX, y: newPanY })
  }, [])

  const scoredCareers = useMemo(() => {
    try {
      if (!careers || careers.length === 0) return []
      return careers.map(c => ({
        ...c,
        matchScore: quizCompleted ? getMatchPercentage(c, quizAnswers, customAnswers) : 0
      })).sort((a, b) => b.matchScore - a.matchScore)
    } catch (err) { return careers || [] }
  }, [careers, quizAnswers, customAnswers, quizCompleted])

  const topRecommendations = useMemo(() => scoredCareers.slice(0, 10).map(c => c.id), [scoredCareers])

  const filteredCareersList = useMemo(() => {
     if (!search) return scoredCareers
     return scoredCareers.filter(c => c.title?.toLowerCase().includes(search.toLowerCase()))
  }, [scoredCareers, search])

  const getCareerNodes = (clusterId, cx, cy, baseAngle) => {
    const clusterCareers = filteredCareersList.filter(c => c.cluster === clusterId)
    const count = clusterCareers.length
    const clusterNode = CLUSTER_NODES.find(cn => cn.id === clusterId)
    const clusterColor = clusterNode?.color || "#0D0D0D"
    
    return clusterCareers.map((c, i) => {
       const spread = 150 // Wider spread to separate nodes
       const startAngle = baseAngle - spread/2
       const angleStep = count > 1 ? spread / (count - 1) : 0
       const angle = (startAngle + i * angleStep) * (Math.PI / 180)
       
       // 3 radius tiers with organic jitter for natural branch lengths
       let radii = [140, 230, 320]
       if (clusterId === "Technology & Data") radii = [180, 260, 340] // Slightly longer for tech
       
       let baseRadius = radii[i % radii.length]
       // Force Game Developer to be in the outer tier if it's too short
       if (c.id === "game-developer") baseRadius = Math.max(baseRadius, 320)

       const jitter = (seededRandom(c.id?.length + i * 7 + 3) - 0.5) * 40
       const radius = baseRadius + jitter
       
       return { 
         ...c, 
         cx: cx + radius * Math.cos(angle), 
         cy: cy + radius * Math.sin(angle), 
         accent: clusterColor,
         isOuter: i % 2 !== 0,
         angle: angle
       }
    })
  }

  // Pre-compute all career nodes with collision resolution
  const allCareerNodes = useMemo(() => {
    try {
      const allNodes = []
      for (const cluster of CLUSTER_NODES) {
        const nodes = getCareerNodes(cluster.id, cluster.x, cluster.y, cluster.branchAngle)
        allNodes.push(...nodes)
      }
      return resolveOverlaps(allNodes, 130)
    } catch (err) {
      console.error('Error computing career nodes:', err)
      return []
    }
  }, [filteredCareersList])

  const youX = 1150
  const youY = 1350

  return (
    <div 
      className="fixed inset-0 bg-paper overflow-hidden font-sans select-none z-0"
    >
      <FloatingPaths position={1} />
      <SeekerNav />

      {/* Personalized Greeting */}
      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-24 left-8 z-30"
          >
            <div className="bg-paper/80 backdrop-blur-md border border-ink-10 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-ink-60">
                Welcome back, {profile.username}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className={`absolute left-8 z-30 flex flex-col gap-4 ${profile ? 'top-40' : 'top-24'}`}>
         {isMinimalData && (
           <div className="text-sm text-ink-60 bg-white/80 backdrop-blur-md border border-ink-10 rounded-xl px-4 py-3 mb-2 max-w-sm shadow-sm">
             You answered fewer questions than usual, so we've shown you a broad map.
             Try the quiz again to see a more personalised view.
           </div>
         )}
         <div className="flex bg-surface/80 backdrop-blur-md p-1 rounded-full w-fit border border-ink-10 shadow-sm">
            <button onClick={() => setFilterMode('for-you')} disabled={!quizCompleted} className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${filterMode === 'for-you' ? 'bg-ink text-paper shadow-lg' : 'text-ink-60 hover:text-ink disabled:opacity-30'}`}>For You</button>
            <button onClick={() => setFilterMode('all')} className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${filterMode === 'all' ? 'bg-ink text-paper shadow-lg' : 'text-ink-60 hover:text-ink'}`}>All Paths</button>
         </div>

         <button
            data-tour="compare-button"
            onClick={enterCompareMode}
            className="flex items-center gap-2 text-sm font-medium text-ink-60
                       border border-ink-10 bg-paper/80 backdrop-blur-md px-4 py-2.5 rounded-xl
                       hover:border-ink-30 hover:text-ink transition-all shadow-sm w-fit"
          >
            <Icon name="compare_arrows" size={16} />
            Compare Paths
          </button>
      </div>

      <div data-tour="zoom-controls" className="absolute bottom-10 left-8 z-30 flex flex-col gap-2">
         <button onClick={() => handleZoom(0.2)} className="w-12 h-12 bg-ink text-paper rounded-full flex items-center justify-center shadow-xl hover:bg-accent"><Icon name="add" size={24} /></button>
         <button onClick={() => handleZoom(-0.2)} className="w-12 h-12 bg-ink text-paper rounded-full flex items-center justify-center shadow-xl hover:bg-accent"><Icon name="remove" size={24} /></button>
         <button onClick={resetView} className="w-12 h-12 bg-surface text-ink rounded-full flex items-center justify-center shadow-lg border border-ink-10"><Icon name="center_focus_strong" size={20} /></button>
      </div>

      <div 
        ref={mapContainerRef}
        data-tour="path-map-area"
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing" 
        style={{ pointerEvents: (selectedCareer || compareResult) ? 'none' : 'auto' }}
        onMouseDown={startPan}
        onMouseMove={onPan}
        onMouseUp={endPan}
        onMouseLeave={endPan}
      >
        <motion.svg ref={svgRef} className="w-full h-full" style={{ overflow: 'visible' }} viewBox="-100 -100 2500 1800" preserveAspectRatio="xMidYMid meet" animate={{ x: pan.x, y: pan.y, scale: zoom }} transition={{ type: 'spring', damping: 25, stiffness: 120 }}>
          <defs>
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Trunk & Branches */}
          {CLUSTER_NODES.map((node, i) => {
            const isActive = hoveredCluster === node.id || selectedCareer?.cluster === node.id
            return (
              <g key={`branch-${node.id}`} opacity={hoveredCluster && !isActive ? 0.1 : 1} className="transition-opacity">
                <motion.path
                  d={getOrganicBranch(youX, youY, node.x, node.y)} fill="none" stroke={isActive ? node.color : "#0D0D0D"} strokeWidth={isActive ? 8 : 4}
                  strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }} style={{ strokeOpacity: isActive ? 0.6 : 0.15 }}
                />
              </g>
            )
          })}

          {/* 2. Domain Labels — Large */}
          {CLUSTER_NODES.map((node) => {
            const isActive = hoveredCluster === node.id || selectedCareer?.cluster === node.id
            const labelAngle = (node.branchAngle + 180) * (Math.PI / 180)
            const lx = Math.cos(labelAngle) * 65
            const ly = Math.sin(labelAngle) * 65
            const cosA = Math.cos(labelAngle)
            const textAnchor = Math.abs(cosA) < 0.2 ? "middle" : (cosA > 0 ? "start" : "end")

            return (
              <g key={`domain-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
                <circle r={12} fill={isActive ? node.color : "#0D0D0D"} />
                <text 
                  x={lx} y={ly} textAnchor={textAnchor}
                  className="font-serif font-black tracking-tight" 
                  style={{ fill: isActive ? node.color : "#0D0D0D", fontSize: '28px' }}
                >
                  {node.label.split('\n').map((line, idx, lines) => (
                    <tspan x={lx} dy={idx === 0 ? (lines.length === 1 ? "0.3em" : "-0.2em") : "1.1em"} key={idx}>{line}</tspan>
                  ))}
                </text>
              </g>
            )
          })}

          {/* 3. Career Nodes */}
          {CLUSTER_NODES.map(node => {
             const cNodes = allCareerNodes.filter(n => n.cluster === node.id)
             return (
               <AnimatePresence key={`cluster-group-${node.id}`}>
                 {cNodes.map(cNode => {
                    const isSelected = selectedCareer?.id === cNode.id
                    const isHovered = hoveredCareer === cNode.id
                    const isSelectedForCompare = compareSelections.includes(cNode.id)
                    const isVisible = filterMode === 'all' || isSelected || (filterMode === 'for-you' && topRecommendations.includes(cNode.id))
                    
                    if (!isVisible) return null

                    const showDetails = isSelected || isHovered
                    const radius = isSelected || isHovered || isSelectedForCompare ? 60 : 50 
                    const circumference = 2 * Math.PI * radius
                    const matchPct = cNode.matchScore || 0
                    const progressOffset = circumference - (circumference * matchPct / 100)
                    const showCurvedText = zoom > 1.2 || isSelected || isHovered || isSelectedForCompare

                    // Text path for curved career name
                    const textPathRadius = radius + 8
                    const textPathId = `text-path-${cNode.id}`

                    const handleNodeClick = () => {
                      if (compareMode) {
                        toggleCompareSelection(cNode.id)
                        return
                      }
                      setSelectedCareer(cNode)
                    }

                    return (
                      <motion.g
                        key={`career-leaf-${cNode.id}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isSelected || isSelectedForCompare ? 1.15 : 1, 
                          opacity: compareMode && !isSelectedForCompare ? 0.4 : 1 
                        }}
                        exit={{ y: 500, opacity: 0, transition: { duration: 0.8 } }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        onMouseEnter={() => setHoveredCareer(cNode.id)}
                        onMouseLeave={() => setHoveredCareer(null)}
                        onClick={handleNodeClick}
                        className="cursor-pointer"
                      >
                        <motion.line
                          x1={node.x} y1={node.y} x2={cNode.cx} y2={cNode.cy}
                          stroke={isSelected || isHovered || isSelectedForCompare ? node.color : 'rgba(13,13,13,0.1)'}
                          strokeWidth={isSelected || isSelectedForCompare ? 3 : 1}
                        />

                        {(isSelected || isHovered || isSelectedForCompare) && (
                          <circle cx={cNode.cx} cy={cNode.cy} r={radius + 18} fill={cNode.accent} opacity={0.15} filter="url(#bloom)" />
                        )}
                        
                        {/* Base circle */}
                        <circle 
                          cx={cNode.cx} cy={cNode.cy} r={radius} 
                          fill={isSelected || isHovered || isSelectedForCompare ? cNode.accent : "#F8F6F1"} 
                          stroke={isSelectedForCompare ? "#E8572A" : "rgba(13,13,13,0.08)"} 
                          strokeWidth={isSelectedForCompare ? 4 : 3} 
                        />
                        
                        {/* Progress stroke showing match % */}
                        {quizCompleted && (
                          <circle 
                            cx={cNode.cx} cy={cNode.cy} r={radius} 
                            fill="none" 
                            stroke={isSelected || isHovered || isSelectedForCompare ? '#F8F6F1' : cNode.accent} 
                            strokeWidth={3.5} 
                            strokeLinecap="round"
                            strokeDasharray={circumference} 
                            strokeDashoffset={progressOffset}
                            transform={`rotate(-90 ${cNode.cx} ${cNode.cy})`}
                          />
                        )}
                        
                        <foreignObject x={cNode.cx - 18} y={cNode.cy - 16} width={36} height={32}>
                           <div className={`flex items-center justify-center w-full h-full ${isSelected || isHovered || isSelectedForCompare ? 'text-paper' : 'text-ink'}`}><Icon name={cNode.icon} size={30} /></div>
                        </foreignObject>

                        {/* Match percentage inside circle */}
                        {quizCompleted && (
                          <text 
                            x={cNode.cx} 
                            y={cNode.cy + 22} 
                            textAnchor="middle" 
                            dominantBaseline="middle"
                            className="font-sans font-bold pointer-events-none" 
                            style={{ fill: isSelected || isHovered || isSelectedForCompare ? '#F8F6F1' : "#0D0D0D", opacity: 0.8, fontSize: '11px' }}
                          >
                            {cNode.matchScore}%
                          </text>
                        )}
                        
                        {/* Curved text around the node — visible on zoom */}
                        {showCurvedText && (
                          <g>
                            <defs>
                              <path id={textPathId} d={`M ${cNode.cx - textPathRadius} ${cNode.cy} A ${textPathRadius} ${textPathRadius} 0 1 1 ${cNode.cx + textPathRadius} ${cNode.cy}`} fill="none" />
                            </defs>
                            <text className="pointer-events-none" style={{ fill: isSelected || isHovered || isSelectedForCompare ? cNode.accent : "#0D0D0D", fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                              <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
                                {cNode.title}
                              </textPath>
                            </text>
                          </g>
                        )}
                      </motion.g>
                    )
                 })}
               </AnimatePresence>
             )
          })}

          {/* Root Trunk (YOU) */}
          <motion.g>
             <circle cx={youX} cy={youY} r={65} fill="#0D0D0D" />
             <text x={youX} y={youY + 10} textAnchor="middle" className="font-sans font-black text-sm tracking-[0.4em] fill-paper uppercase">You</text>
          </motion.g>
        </motion.svg>
      </div>

      {/* Right Sidebar — Cluster Navigator */}
      <div className="absolute top-24 right-6 z-30 w-56 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
        <div className="bg-surface/90 backdrop-blur-md rounded-2xl border border-ink-10 shadow-lg overflow-hidden">
          {CLUSTER_NODES.map(cluster => {
            const isOpen = expandedCluster === cluster.id
            const clusterCareers = allCareerNodes.filter(n => n.cluster === cluster.id)
            return (
              <div key={cluster.id}>
                <button
                  onClick={() => setExpandedCluster(isOpen ? null : cluster.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-ink-5 transition-colors border-b border-ink-5"
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cluster.color }} />
                  <span className="text-xs font-bold text-ink tracking-tight leading-tight flex-1">{cluster.id}</span>
                  <Icon name={isOpen ? "expand_less" : "expand_more"} size={16} className="text-ink-40" />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {clusterCareers.map(career => (
                        <button
                          key={career.id}
                          onClick={() => {
                            setSelectedCareer(career)
                            navigateToNode(career.cx, career.cy)
                          }}
                          className="w-full flex items-center gap-2 px-5 py-2 text-left hover:bg-ink-5 transition-colors group"
                        >
                          <Icon name={career.icon} size={16} className="text-ink-40 group-hover:text-ink" />
                          <span className="text-[11px] text-ink-70 group-hover:text-ink font-medium truncate">{career.title}</span>
                          {quizCompleted && (
                            <span className="ml-auto text-[10px] font-bold shrink-0" style={{ color: cluster.color }}>{career.matchScore}%</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedCareer && <CareerDrawer career={selectedCareer} />}
      </AnimatePresence>
      <CompareOverlay />

      {/* Compare Mode Bar */}
      <AnimatePresence>
        {compareMode && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-40 flex items-center gap-6
                       bg-ink text-paper px-8 py-4 rounded-2xl shadow-2xl min-w-[400px]"
          >
            {/* Selection slots */}
            <div className="flex items-center gap-4">
              {[0, 1].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${compareSelections[i]
                      ? 'border-accent bg-accent text-white'
                      : 'border-paper/20 text-paper/30'
                    }`}
                  >
                    {compareSelections[i]
                      ? allCareerNodes.find(n => n.id === compareSelections[i])?.title?.slice(0, 2).toUpperCase()
                      : (i + 1)
                    }
                  </div>
                  {i === 0 && (
                    <span className="text-paper/30 text-xs font-bold uppercase tracking-widest">vs</span>
                  )}
                </div>
              ))}
            </div>

            {/* Instruction text */}
            <div className="flex-1 border-l border-paper/10 pl-6">
              <p className="text-[10px] text-paper/40 uppercase tracking-widest font-bold mb-0.5">
                {compareSelections.length === 2 ? 'Ready' : 'Selection'}
              </p>
              <p className="text-sm text-paper/80 font-medium">
                {compareSelections.length === 0 && 'Select two careers to compare'}
                {compareSelections.length === 1 && 'Select a second career'}
                {compareSelections.length === 2 && 'Paths selected'}
              </p>
            </div>

            {/* Compare button — only when 2 selected */}
            <div className="flex items-center gap-3">
              {compareSelections.length === 2 && (
                <button
                  onClick={handleRunComparison}
                  disabled={compareLoading || compareSelections.length !== 2}
                  className="bg-accent text-white text-sm font-bold px-6 py-2.5 rounded-xl
                             hover:bg-[#D44E25] transition-all shadow-lg active:scale-95 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {compareLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Comparing...
                    </span>
                  ) : 'Compare →'}
                </button>
              )}

              {/* Cancel */}
              <button
                onClick={exitCompareMode}
                className="text-paper/50 hover:text-paper text-sm font-medium px-2 py-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ask Seeker Button (Diksha style) */}
      <motion.button
        data-tour="ask-seeker-nav"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/chat')}
        className="fixed bottom-10 right-8 z-[60] flex items-center gap-3 bg-paper border border-ink-10 p-2 pr-6 rounded-full shadow-2xl hover:border-accent transition-colors"
      >
        <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-ink-5 overflow-hidden">
          <SageAvatar size={44} />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black tracking-widest uppercase text-ink-30">Counsellor</span>
          <span className="text-sm font-bold text-ink tracking-tight">Ask Seeker</span>
        </div>
      </motion.button>
    </div>
  )
}
