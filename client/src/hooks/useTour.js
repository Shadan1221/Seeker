import useAppStore from '../store/useAppStore'

export function useTour() {
  const tourStep = useAppStore(s => s.tourStep)
  const isNewUser = useAppStore(s => s.isNewUser)
  const tourDismissed = useAppStore(s => s.tourDismissed)

  const advanceTour = (nextStep) => {
    useAppStore.getState().setTourStep(nextStep)
  }

  const dismissTour = () => {
    useAppStore.getState().dismissTour()
  }

  const completeTour = () => {
    useAppStore.getState().completeTour()
  }

  return { tourStep, isNewUser, tourDismissed, advanceTour, dismissTour, completeTour }
}
