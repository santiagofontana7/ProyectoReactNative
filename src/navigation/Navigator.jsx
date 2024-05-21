import { Platform, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { getSession } from '../databases/sqlLite'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/User/userSlice'

const Navigator = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth.value)

  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        try {
          const response = await getSession()
          if (response.rows._array.length) {
            const userLogged = response.rows._array[0]
            dispatch(setUser({
              email: userLogged.email,
              localId: userLogged.localId,
              idToken: userLogged.token
            }))
          }
        } catch (error) {
          console.log(error);
        }
      })()
    }
  }, [])

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})