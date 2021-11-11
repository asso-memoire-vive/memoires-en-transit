import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export class TimeLine extends PureComponent {

  constructor() {
    super()
    this.state = {
      delay: null,
      disabled: false,
      minCursorX: 0,
      maxCursorX: 0,
      minCursorDate: 0,
      maxCursorDate: 0
    }
  }

  componentWillMount() {
    this._getMinMaxDates()
    this._addListeners()
    //this.delay = null
  }

  componentDidMount() {
    this._setWindowVars()
  }

  componentWillUnmount() {
    this._removeListeners()
  }


  updateCursors(data) {
    let state = {
      animate: true,
    }

    if (data.minCursorDefaultTimestamp) {
      const minTime = new Date(data.minCursorDefaultTimestamp * 1000).getFullYear()
      state.minCursorX = this._getDateX(minTime)
    }

    if (data.maxCursorDefaultTimestamp) {
      const maxTime = new Date(data.maxCursorDefaultTimestamp * 1000).getFullYear()
      state.maxCursorX = this._getDateX(maxTime)
    }

    this.setState(
      state,
      () => {
        this._updateValue()
      })
  }

  _handleDrag(event) {
    const { cursorWidth, disabled } = this.props

    const { activeCursor, activeCursorOffsetClient, minCursorX, maxCursorX, wrapperSize } = this.state
    if (disabled) return false
    let state = {}

    const index = activeCursor
    let translateValue = event.clientX - activeCursorOffsetClient

    if (index === 'max') {
      if (translateValue > wrapperSize - cursorWidth) translateValue = wrapperSize - cursorWidth
      if (translateValue < minCursorX + cursorWidth) translateValue = minCursorX + cursorWidth
    }

    if (index === 'min') {
      if (translateValue < 0) translateValue = 0
      if (translateValue > maxCursorX - cursorWidth) translateValue = maxCursorX - cursorWidth
    }

    state[`${index}CursorX`] = translateValue

    this.setState(state, () => {
      this._updateValue()
    })
  }

  _handleChange() {
    const {onChange, onChangeDelay} = this.props
    if (onChange !== null && typeof onChange === 'function') {
      clearTimeout(this.delay)

      this.delay = setTimeout(() => {
        onChange(this.state)
      }, onChangeDelay)
    }
  }

  _getMinMaxDates() {
    // TODO Remove from component did mount//
    const {dates, minTimestamp, maxTimestamp} = this.props

    let minTime
    let maxTime

    if (minTimestamp && maxTimestamp && minTimestamp !== maxTimestamp) {
      minTime = minTimestamp
      maxTime = maxTimestamp
    } else {
      if (dates) {
        minTime = dates[0].start
        maxTime = dates[0].start

        for (let date of dates) {
          if (date.start < minTime) minTime = date.start
          if (date.start > maxTime) maxTime = date.start
        }
      }
    }

    minTime = new Date(minTime * 1000).getFullYear()
    maxTime = new Date(maxTime * 1000).getFullYear()

    this.setState(
      {
        minTime,
        maxTime,
        minCursorDate: minTime,
        maxCursorDate: maxTime
      }
    )
  }

  _getAvailableYearsHtml(min, max) {
    const {maxCursorDate, minCursorDate, timeScale} = this.state
    let html = []

    if (typeof timeScale === 'undefined') return null

    const style = {
      width: timeScale + 'px'
    }

    for (min; min <= max; min++) {
      let className = "time-block--year"

      if (min > minCursorDate && min < maxCursorDate) className += " time-block--in-range"
      if (min === minCursorDate || min === maxCursorDate) className += " time-block--active"

      html.push(
        (<div
          className="time-block"
          key={`year-${min}`}
          onClick={this._transitionTo.bind(this, min)}
          style={style}
        >
          <span className={className}>
            {min}
          </span>
        </div>)
      )
    }

    return html
  }

  _handleMouseUp = () => {
    this._handleDrag = this._handleDrag.bind(this)
    window.removeEventListener('mousemove', this._handleDrag, true)
  }

  _handleMouseDown = (cursor, event) => {
    this._handleDrag = this._handleDrag.bind(this)

    this.setState(
      {
        animate: false,
        activeCursor: cursor,
        activeCursorOffsetClient: event.clientX - this.state[`${cursor}CursorX`]
      }, () => {
        window.addEventListener('mousemove', this._handleDrag, true)
      }
    )
  }

  _handleResize = () => {
    this._setWindowVars()
  }

  _addListeners() {
    window.addEventListener('mouseup', this._handleMouseUp, false)
    window.addEventListener('resize', this._handleResize, false)
  }

  _removeListeners() {
    window.removeEventListener('mouseup', this._handleMouseUp, false)
    window.removeEventListener('resize', this._handleResize, false)
  }


  _setWindowVars = () => {
    const { maxTime, minTime, timeScale } = this.state
    const { cursorWidth, maxCursorDefaultTimestamp, minCursorDefaultTimestamp } = this.props

    const time = maxTime - minTime + 1;


    console.log('timelineWrapper.offsetWidth', this.timelineWrapper.offsetWidth)

    const wrapperSize = this.timelineWrapper.offsetWidth
    const wrapperOffsetLeft = this.timelineWrapper.offsetLeft

    let {minCursorX, maxCursorX} =  this.state
    let newTimeScale = wrapperSize / time

    if (newTimeScale < cursorWidth) {
      newTimeScale = cursorWidth
    }


    if (timeScale) {
      minCursorX = this._getRepositionCursorX('min', newTimeScale)
      maxCursorX = this._getRepositionCursorX('max', newTimeScale)
    } else {
      const minTime = new Date(minCursorDefaultTimestamp * 1000).getFullYear()
      const maxTime = new Date(maxCursorDefaultTimestamp * 1000).getFullYear()

      minCursorX = this._getDateX(minTime, newTimeScale, wrapperSize)
      maxCursorX = this._getDateX(maxTime, newTimeScale, wrapperSize)
    }

    this.setState(
      {
        animate: false,
        wrapperSize,
        wrapperOffsetLeft,
        timeScale: newTimeScale,
        minCursorX,
        maxCursorX
      }, () => {
        this._updateValue()
      })
  }

  _getCursorLabel() {
    const {minTime, maxTime} = this.state
    const {customMinMessage, customMaxMessage} = this.props
    const halfCursorWith = this.props.cursorWidth / 2
    const minCursorDate = this.state.minTime + parseInt((this.state.minCursorX + halfCursorWith) / this.state.timeScale)
    const maxCursorDate = this.state.minTime + parseInt((this.state.maxCursorX + halfCursorWith) / this.state.timeScale)
    const minCursorLabel = minCursorDate === minTime && customMinMessage !== null ? customMinMessage : minCursorDate
    const maxCursorLabel = maxCursorDate === maxTime && customMaxMessage !== null ? customMaxMessage : maxCursorDate

    return {minCursorDate, maxCursorDate, minCursorLabel, maxCursorLabel}
  }

  _updateValue() {
    const {minCursorDate, maxCursorDate, minCursorLabel, maxCursorLabel} = this._getCursorLabel()

    if (minCursorDate === this.state.minCursorDate &&
      maxCursorDate === this.state.maxCursorDate &&
      minCursorLabel === this.state.minCursorLabel &&
      maxCursorLabel === this.state.maxCursorLabel) return false

    const minCursorTimestamp = this._getFirstDayTimestamp(minCursorDate)
    const maxCursorTimestamp = this._getLastDayTimestamp(maxCursorDate)

    this.setState(
      {
        minCursorDate,
        maxCursorDate,
        minCursorLabel,
        maxCursorLabel,
        minCursorTimestamp,
        maxCursorTimestamp
      },
      () => {
        this._handleChange()
      }
    )
  }

  _getFirstDayTimestamp(year) {
    const date = new Date(year, 0, 1, 0, 0, 0, 0)
    return date.getTime() / 1000
  }

  _getLastDayTimestamp(year) {
    const date = new Date(year, 11, 31, 0, 0, 0, 0)
    return date.getTime() / 1000
  }

  _transitionTo(year, event) {
      const { maxCursorDate, maxTime, minCursorDate, wrapperOffsetLeft } = this.state
      const { cursorWidth } = this.props
    const minCursorDiff = Math.abs(year - minCursorDate)
    const maxCursorDiff = Math.abs(year - maxCursorDate)
    const activeCursor = minCursorDiff < maxCursorDiff ? 'min' : 'max'
    const clientX = event.clientX - wrapperOffsetLeft
    const activeCursorOffsetClient = year === maxTime ? - cursorWidth : cursorWidth / 2


    this._handleDrag = this._handleDrag.bind(this)
    this.setState({
      activeCursor,
      activeCursorOffsetClient,
      animate: true,
    }, () => {
      this._handleDrag({clientX})
    })
  }

  _getRepositionCursorX(cursor, newTimescale) {
    return (this.state[`${cursor}CursorX`] * newTimescale) / this.state.timeScale
  }

  _getDateX(year, timeScale) {
      const { maxTime, minTime } = this.state
      const { cursorWidth } = this.props

      const currentTimeScale = timeScale ? timeScale : this.state.timeScale
      // TODO rename this timeScale
    let dateX = (year - minTime) * currentTimeScale

    if (year === maxTime) {
      dateX = dateX + (currentTimeScale - cursorWidth)
    }

    return dateX
  }

  _reset = () => {
    this.updateCursors({
      minCursorDefaultTimestamp: 601257600,
      maxCursorDefaultTimestamp: 917980800,
    })
  }


  render() {
      const { animate, minCursorX, maxCursorX } = this.state
      const { cursorArrow, cursorWidth, disabled } = this.props
      
    const minCursorStyle = {
      transform: `translate3d(${minCursorX}px,0,0)`,
      width: cursorWidth
    }

    const maxCursorStyle = {
      transform: `translate3d(${maxCursorX}px,0,0)`,
      width: cursorWidth
    }

    const timeRangeStyle = {
      transform: `translate3d(${minCursorX}px,0,0)`,
      width: (maxCursorX - minCursorX) + cursorWidth
    }

    let minCursorClass = 'time-cursor time-cursor--min'
    let maxCursorClass = 'time-cursor time-cursor--max'
    let timeRangeClass = 'timeline-range'
    let timelineWrapperClass = 'timeline-wrapper'
    if (animate) {
      //minCursorStyle.transition = maxCursorStyle.transition = timeRangeStyle.transition = 'all 0.25s ease';
      minCursorClass += ' timeline-animate'
      maxCursorClass += ' timeline-animate'
      timeRangeClass += ' timeline-animate'
    }

    if (cursorArrow) {
      minCursorClass += ' cursor-arrow'
      maxCursorClass += ' cursor-arrow'
    }

    if (disabled) timelineWrapperClass += ' timeline--disabled'

    return (
      <div className="frise-container">
        <div 
          className={timelineWrapperClass}
          ref={(ref) => this.timelineWrapper = ref}
        >
          <div className="timeline-available">
            {this._getAvailableYearsHtml(this.state.minTime, this.state.maxTime)}
          </div>
          <div
            className={timeRangeClass}
            style={timeRangeStyle}
          />
          <div
            className={minCursorClass}
            onMouseDown={this._handleMouseDown.bind(this, 'min')}
            onTouchStart={this._handleMouseDown.bind(this, 'min')}
            ref={(ref) => this.minCursor = ref}
            style={minCursorStyle}
          >
            {this.state.minCursorLabel}
          </div>
          <div
            className={maxCursorClass}
            onMouseDown={this._handleMouseDown.bind(this, 'max')}
            onTouchStart={this._handleMouseDown.bind(this, 'max')}
            ref={(ref) => this.maxCursor = ref}
            style={maxCursorStyle}
          >
            {this.state.maxCursorLabel}
          </div>
        </div>

        <div className="example-controls">
          <button
            onClick={this._reset}
            type="button"
          >
            {'Réinitisaliser'}
          </button>
        </div>
      </div>
    )
  }
}


TimeLine.defaultProps = {
  cursorArrow: true,
  //cursorSnap: false,
  cursorWidth: 75,
  customMaxMessage: null,
  customMinMessage: null,
  dates: [{
    start: 601257600,
    end: 957139200
  }],
  disabled: false,
  maxCursorDefaultTimestamp: 0,
  maxTimestamp: 0,
  minCursorDefaultTimestamp: 0,
  minTimestamp: 0,
  onChange: null,
  onChangeDelay: 0,
  //timeRangeDrag: false,
}

TimeLine.propTypes = {
  cursorArrow: PropTypes.bool,
  //cursorSnap: PropTypes.bool,
  cursorWidth: PropTypes.number,
  customMaxMessage: PropTypes.object,
  customMinMessage: PropTypes.object,
  dates: PropTypes.array,
  disabled: PropTypes.bool,
  maxCursorDefaultTimestamp: PropTypes.number,
  maxTimestamp: PropTypes.number,
  minCursorDefaultTimestamp: PropTypes.number,
  minTimestamp: PropTypes.number,
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.number,
  //timeRangeDrag: PropTypes.bool,
}

export default TimeLine
