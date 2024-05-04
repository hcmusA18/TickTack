import { Audio } from 'expo-av'
import { Sound } from 'libs/types'
export const loadBackgroundMusic = async ({
  music,
  soundObject
}: {
  music: Sound | null
  soundObject: Audio.Sound | null
}) => {
  try {
    const { sound } = await Audio.Sound.createAsync({
      uri: music?.music_url
    })
    // await sound.loadAsync()
    soundObject = sound
    await soundObject.setIsLoopingAsync(true)
    await soundObject.playAsync()
  } catch (error) {
    console.log('Error loading sound', error)
  }
}
