import React from 'react'
import { Image, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//! Icons
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect, router, useRouter } from 'expo-router'

const SignIn = () => {
    const router = useRouter()

    const { refetch, loading, isLoggedIn } = useGlobalContext()

    if (!loading && isLoggedIn) return <Redirect href="/" />

    const handleLogin = async () => {
        const result = await login()

        if (result) {
            router.replace("/")
            refetch()
            console.log("login success");

        } else {
            Alert.alert("Error", "Faild to  login")
        }
    }





    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full text-center">
                <Image
                    source={images.onboarding}
                    className='max-h-[450] w-full mx-auto'
                    resizeMode='contain'
                />
                <View className="px-10">
                    <Text className='text-base text-center uppercase
                     font-rubik text-black-200'>
                        Welcome to Real Scout
                    </Text>
                    <Text className='text-3xl font-rubik-bold text-black-300 
                    text-center mt-2'>
                        Let’s get you closer
                        to {"\n"} <Text className='text-primary-300'>your ideal home</Text>
                    </Text>
                    <Text className='text-lg font-rubik
                     text-black-100 text-center mt-12'>Login to Real Scout with Google
                    </Text>
                    <TouchableOpacity onPress={handleLogin}
                        className='bg-white shadow-md
                         shadow-zinc-300 rounded-full w-full py-4 mt-5'>
                        <View className='flex flex-row items-center justify-center '>
                            <Image
                                source={icons.google}
                                className='w-5 h-5'
                                resizeMode='contain'
                            />
                            <Text className='text-lg *:font-rubik-medium
                             text-black-300 ml-2'>Sign Up with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

