import React from 'react'
import FFmpegFeature from '../FFmpegFeature';
import Slider from '../../clui-ui-components/Slider'

type ChangeSpeedConfig = {
  SPEED: { value: number; [name: string]: any }
  [name: string]: any
}

class ChangeSpeedFeature extends FFmpegFeature {
  configuration: ChangeSpeedConfig
  speed = 0;

  constructor(configuration: ChangeSpeedConfig) {
    super()
    this.configuration = configuration
    const { speedValue } = this.parseConfiguration()
    this.speed = speedValue;
    var speedStr = (1/(speedValue/100)).toString().substring(0, 4);
    console.log(`-vf  "setpts=${speedStr}*PTS"`);
    this.setFFmpegCommands(`-vf  \'setpts=${speedStr}*PTS\'`) 
    // this.setFFmpegCommands('-vf  "setpts=4*PTS"') 
    this.setProgress()
    this.setFileConfig()
  }

  setFileConfig = () => {
    this.fileConfig = {
      primaryType: 'video',
      types: [{ name: 'video', number: { min: 1, max: 1 } }]
    }
  }

  setFFmpegCommands(command: string) {
    this.ffmpegCommands = command
  }

  setProgress = () => {
    if (this.speed > 1) {
      this.progressBar.name = 'Increasing playback speed by ' + this.speed + '% ...';
    }
    else {
      this.progressBar.name = 'Decreasing playback speed by ' + this.speed + '% ...';
    }
    this.progressBar.color = '#3FBD71'
  }

  parseConfiguration = () => {
    const { SPEED } = this.configuration
    const { value } = SPEED
    return { speedValue: value }
  }
}

export default ChangeSpeedFeature;

const ChangeSpeedUi = ({ parents }: { parents: Array<string> }) => {
  const SliderProps = {
    parents: parents,
    title: 'Speed',
    min: 1,
    max: 1000
  }

  // const Slider = {
  //   parents,
  //   min: 0.1,
  //   max: 10,
  //   title: 'Speed Level'
  // }

  // const current = { name: 'Speed', value: 1 }

  // const props = {
  //   parents,
  //   title: 'Speed Settings',
  //   current,
  //   list: SliderProps
  // }

  return <Slider {...SliderProps}/>
}

export { ChangeSpeedUi }