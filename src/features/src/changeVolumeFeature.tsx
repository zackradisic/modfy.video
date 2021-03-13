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
