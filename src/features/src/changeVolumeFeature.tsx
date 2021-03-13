import React from 'react'
import Slider from '../../clui-ui-components/Slider'
import List from '../../clui-ui-components/List'

import FFmpegFeature from '../FFmpegFeature'

type ChangeVolumeConfig = {
  VOLUME: { value: number; [name: string]: any }
  [name: string]: any
}

class ChangeVolumeFeature extends FFmpegFeature {
  configuration: ChangeVolumeConfig

  constructor(configuration: ChangeVolumeConfig) {
    super()
    this.configuration = configuration
    const { volumeValue } = this.parseConfiguration()
    const command = this.changeVolumeCommand(volumeValue)
    this.setFFmpegCommands(command)
    this.setProgress()
    this.setFileConfig()
  }

  parseConfiguration = () => {
    const { VOLUME } = this.configuration
    return { volumeValue: VOLUME.value }
  }

  setFFmpegCommands(command: string) {
    this.ffmpegCommands = command
  }

  setProgress = () => {
    this.progressBar.name = 'Changing Volume...'
    this.progressBar.color = '#3FBD71'
  }

  setFileConfig = () => {
    this.fileConfig = {
      types: [{ name: 'video', number: { min: 1, max: 1 } }],
      primaryType: 'video'
    }
  }

  /**
   * Sets the volume value in the FFmpeg command
   * @param volumeValue: The volume value chosen on the slider
   */
  private changeVolumeCommand = (volumeValue: number): string => {
    const finalVolumeValue = `-af 'volume=${volumeValue}'`
    return finalVolumeValue
  }
}

export default ChangeVolumeFeature

const ChangeVolumeUi = ({ parents }: { parents: Array<string> }) => {
  const ListElements = [
    { name: '50%', value: 0.5 },
    { name: '75%', value: 0.75 },
    { name: '125%', value: 0.125 },
    {
      name: 'Custom',
      value: 1,
      child: {
        component: Slider,
        props: {
          parents,
          min: 0.1,
          max: 2,
          title: 'Custom Level'
        },
        paddingTop: 3
      }
    }
  ]

  const current = { name: '75%', value: 0.75 }

  const props = {
    parents,
    title: 'Volume Reduction Settings',
    current,
    list: ListElements
  }

  return <List {...props} />
}

export { ChangeVolumeUi }
