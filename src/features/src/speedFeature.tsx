/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * This is a special transcode feature to transcode files to gifs
 * It represents a mix between a regular feature and a format, as a special format
 */

import React, { useEffect, useState } from 'react'

import FFmpegFeature from '../FFmpegFeature'

import CluiStore from '../../store/cluiStore'

const { updateConfiguration } = CluiStore

export type SpeedFeatureConfiguration = {
  MY_FEATURE: { value: number; [name: string]: any }
  [name: string]: any
}

class SpeedFeature extends FFmpegFeature {
  // @ts-ignore Set in Constructor
  configuration: SpeedFeatureConfiguration

  constructor(configuration: SpeedFeatureConfiguration) {
    super()
    this.configuration = configuration
    const { value } = this.parseConfiguration()
    console.info(`speed - ${value}`)
    this.setFFmpegCommands(value)
    this.setProgress()
    this.setFileConfig()
  }

  setFFmpegCommands = (videoSpeed: number) => {
    const setpts = videoSpeed * 0.01
    // TODO: speed up or down the audio `-filter:a 'atempo=2'`
    this.ffmpegCommands = `-filter:v 'setpts=${setpts}*PTS'`
  }

  parseConfiguration = () => {
    const { configuration } = this
    const { value } = configuration.MY_FEATURE
    return { value }
  }

  setProgress = () => {
    this.progressBar.name = 'Working on the speed of video!'
    this.progressBar.color = '#0d6efd'
  }

  setFileConfig = () => {
    this.fileConfig = {
      types: [{ name: 'video', number: { min: 1, max: 1 } }],
      primaryType: 'video'
    }
  }
}

export default SpeedFeature

const SpeedFeatureUi = () => {
  const [speed, setSpeed] = useState('100')

  useEffect(() => {
    const videoSpeed = parseInt(speed || '100', 10)

    updateConfiguration(
      {
        value: videoSpeed
      },
      ['MY_FEATURE']
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed])

  return (
    <>
      <div className="mb-8">
        <p className="mb-2">Select speed</p>
        <div className="flex">
          <span className="mx-3">0</span>
          <input
            type="range"
            min="1"
            max="200"
            className="slider flex-1 mx-auto"
            id="videoSpeed"
            value={speed}
            onChange={(e: any) => setSpeed(e.target.value)}
          />
          <span className="mx-3">2x</span>
        </div>
      </div>
    </>
  )
}

export { SpeedFeatureUi }
