import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {


    return (
        <View style={{ height: "100vh", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text className='font-bold text-lg text-red-500'>Well come to real state</Text>
            <Link href="/sign-in">Go to sign in</Link>
            <Link href="/explore">Go to explore</Link>
            <Link href="/profile">Go to profile</Link>
            <Link href="/properties/1">property 1</Link>
        </View>
    )
}

export default index