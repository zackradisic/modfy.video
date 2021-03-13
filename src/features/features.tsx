/* global JSX */
import React from 'react'

// Features
import TranscodeFeature, { TranscodeUi } from './src/transcodeFeature'
import CompressionFeature, { CompressionUi } from './src/compressionFeature'
import PhotoMontageFeature, { PhotoMontageUi } from './src/photoMontage'
import ConcatFeature, { ConcatUi } from './src/concatFeature'
import AspectRatioFeature, { AspectRatioUi } from './src/aspectRatioFeature'
import TrimFeature, { TrimUi } from './src/trimFeature'
import SpeedFeature, { SpeedFeatureUi } from './src/speedFeature'

// Custom Run Feature

import RunFeature, { RunUi } from './src/runFeature'

// UI LESS Features
import GreyScaleFeature from './src/greyScaleFeature'
import CombinedExecFeature from './src/combinedExecFeature'

import keys from './featureKeys.json'
import MuteFeature from './src/muteFeature'

export type Feature =
  | typeof MuteFeature
  | typeof TranscodeFeature
  | typeof CompressionFeature
  | typeof PhotoMontageFeature
  | typeof ConcatFeature
  | typeof GreyScaleFeature
  | typeof AspectRatioFeature
  | typeof RunFeature
  | typeof TrimFeature
  | typeof CombinedExecFeature
  | typeof SpeedFeature

export type FeatureElement = {
  name: string
  description: string
  feature: Feature
  ui?: JSX.Element | string
  noDisplay?: boolean
}

export type Features = {
  [name in keyof typeof keys]: FeatureElement
}

const FEATURES: Features = {
  TRANSCODE: {
    name: 'Convert',
    description: 'Choose which format to convert your video to',
    feature: TranscodeFeature,
    ui: <TranscodeUi parents={['TRANSCODE']} />
  },
  COMPRESS: {
    name: 'Compress',
    description: 'Choose how much you want to compress your video',
    feature: CompressionFeature,
    ui: <CompressionUi parents={['COMPRESS']} />
  },
  TRIM: {
    name: 'TRIM/CUT',
    description: 'Trim or cut your video',
    feature: TrimFeature,
    ui: <TrimUi parents={['TRIM']} />
  },
  PHOTOMONTAGE: {
    name: 'Photo-Montages',
    description: 'Create a video montage from photos(you can add audio too!)',
    feature: PhotoMontageFeature,
    ui: <PhotoMontageUi parents={['PHOTO_MONTAGE']} />
  },

  CONCAT: {
    name: 'Combine-Videos',
    description: 'Combine multiple videos',
    feature: ConcatFeature,
    ui: <ConcatUi />
  },

  ASPECT_RATIO: {
    name: 'Aspect-Ratio',
    description: 'Change the aspect ratio for the video',
    feature: AspectRatioFeature,
    ui: <AspectRatioUi parents={['ASPECT_RATIO']} />
  },

  SPEED: {
    name: 'Change Speed',
    description: 'Change speed of the video',
    feature: SpeedFeature,
    ui: <SpeedFeatureUi />
  },

  CUSTOM_RUN: {
    name: 'Custom-Run(Experimental)',
    description: 'Run your own ffmpeg command',
    feature: RunFeature,
    ui: <RunUi parents={['RUN']} />,
    noDisplay: true
  },

  // UI LESS FEATURES

  GREYSCALE: {
    name: 'Greyscale',
    description: 'Make Video black and white',
    feature: GreyScaleFeature
  },

  COMBINED_EXEC_FEATURE: {
    name: 'Combined-Execution',
    description: 'Running multiple commands together',
    feature: CombinedExecFeature,
    noDisplay: true
  },
  MUTE: {
    name: 'Mute',
    description: 'Mute the audio from videos',
    feature: MuteFeature
  }
}

export default FEATURES
