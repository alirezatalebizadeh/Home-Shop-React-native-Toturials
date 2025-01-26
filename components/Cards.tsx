import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Models } from "react-native-appwrite"

interface Props {
    item: any;
    onPress?: () => void
}

export const FeturedCard = ({ item, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex flex-col items-start w-52 h-80 relative overflow-hidden  box-border'
        >
            <View className='w-full h-full'>
                <Image source={images.newYork} className='size-full rounded-' />
                <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0' />

                <View className='flex flex-row items-center bg-white/90
             px-3 py-1.5 rounded-full absolute top-5 right-5'>
                    <Image source={icons.star} className='size-3.5' />
                    <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>
                        4.8
                    </Text>
                </View>
                <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
                    <Text className='text-xl font-rubik-extrabold text-white' numberOfLines={1}>
                        Merialla Villa
                    </Text>
                    <Text className='text-base font-rubik text-white' numberOfLines={1}>
                        New York, US
                    </Text>
                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className='text-xl font-rubik-extrabold text-white'>
                            $12219
                        </Text>
                        <Image source={icons.heart} className='size-5' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}



export const Card = ({ item, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex-1 w-full h-80 mt-4 px-3 py-4 
        rounded-lg bg-white shadow-lg shadow-black-100/70 relative overflow-hidden box-border'>

            <View className='relative z-20'>
                <View className='flex flex-row items-center absolute px-2 top-2  right-2 bg-white/90 p-1 rounded-full'>
                    <Image source={icons.star} className='size-2.5' />
                    <Text className='text-xs font-rubik-bold text-primary-300 ml-0.5'>4.7</Text>
                </View>
            </View>

            <Image source={images.newYork} className='w-full h-40 absolute -z-20'

                resizeMode='center' />

            {/* //! Bottom of Card */}
            <View className='flex flex-col mt-2 absolute bottom-0 w-full bg-white z-20 '>
                <Text className='text-base font-rubik-bold text-black-300'>Home shop</Text>
                <Text className='text-xs font-rubik text-black-100'>New York</Text>
                <View className='flex flex-row items-center justify-between mt-2'>
                    <Text className='text-base font-rubik-bold text-primary-300'>$254.25</Text>
                    <Image
                        source={icons.heart}
                        className='w-5 h-5 mr-2'
                        tintColor="#191D31"
                    />

                </View>
            </View>
        </TouchableOpacity>
    )
}

