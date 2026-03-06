import { STREAMS } from '../data/streams.js'

export function getStreams(req, res) {
  res.json({ streams: STREAMS, total: STREAMS.length })
}