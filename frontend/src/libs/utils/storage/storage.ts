import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Loads a string from storage
 * @param key The key to fetch
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 * Saves a string to storage
 * @param key The key to save
 * @param value The value to save
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Loads something from storage and parses it as JSON
 * @param key The key to fetch
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const almostData = await AsyncStorage.getItem(key)
    return JSON.parse(almostData ?? '')
  } catch {
    return null
  }
}

/**
 * Saves something to storage as JSON
 * @param key The key to save
 * @param value The value to save
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Removes something from storage
 * @param key The key to remove
 */
export async function remove(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Clears all storage
 */
export async function clear(): Promise<boolean> {
  try {
    await AsyncStorage.clear()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
