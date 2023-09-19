import cn from 'classnames'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { IconArrowDown, IconBack, IconForward } from '~/components/Icons'
import { usePageNavigate, usePlayer, useWindowDrag } from '~/hooks'

export default function NavbarLeft() {
  const onDrag = useWindowDrag()
  const { playerState, setShowDetail } = usePlayer()
  const { showDetail } = playerState
  const downRef = useRef(null)
  const historyRef = useRef(null)
  const { forwardNavigate, backNavigate, isFirstHistory, isLatestHistory } =
    usePageNavigate()
  const classes =
    'w-7 h-7 rounded-full flex-center bg-black/0 text-2xl transition-colors duration-300'

  return (
    <div
      className="item-center relative z-2 h-full w-sidebar"
      onMouseDown={onDrag}
    >
      <CSSTransition
        in={showDetail}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={downRef}
      >
        <IconArrowDown
          ref={downRef}
          className="ml-22 text-xl"
          onClick={() => setShowDetail(false)}
        />
      </CSSTransition>
      <CSSTransition
        in={!showDetail}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={historyRef}
      >
        <div ref={historyRef} className="absolute right-2 top-3 flex-center">
          <IconBack
            className={cn(
              classes,
              'mr-2',
              isFirstHistory
                ? 'text-text-lighter'
                : 'text-text-light-dark hover:bg-black/6',
            )}
            onClick={backNavigate}
          />
          <IconForward
            className={cn(
              classes,
              isLatestHistory
                ? 'text-text-lighter'
                : 'text-text-light-dark hover:bg-black/6',
            )}
            onClick={forwardNavigate}
          />
        </div>
      </CSSTransition>
    </div>
  )
}
