import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeturedCard } from '@/components/Cards'
import Filter from '@/components/Filter'

const index = () => {


    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='px-5'>
                <View className='flex flex-row items-center
                 justify-between mt-5'>
                    <View className='flex flex-row items-center'>
                        <Image
                            source={images.avatar}
                            className='size-12 rounded-full'
                        />
                        <View className='flex flex-col items-start justify-center ml-2'>
                            <Text className='text-xs font-rubik text-black-100'>Good Morning</Text>
                            <Text className='text-base font-rubik-medium text-black-100'>Alireza Talebizadeh</Text>
                        </View>
                    </View>
                    <Image source={icons.bell} className='size-6' />
                </View>
            </View>

            {/* //! Search Components */}
            <Search />

            {/* //!Featured */}
            <View className='my-5'>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-xl font-rubik-bold text-black-300'>Featured</Text>
                    <TouchableOpacity>
                        <Text className='text-base font-rubik-bold text-primary-300'>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
{/* 
            <View className='flex flex-row gap-5 mt-5'>
                <FeturedCard />
                <FeturedCard />
                <FeturedCard />
            </View> */}


            {/* //!Recommendation */}
            <View className='my-5'>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-xl font-rubik-bold text-black-300'>Our Recommendation</Text>
                    <TouchableOpacity>
                        <Text className='text-base font-rubik-bold text-primary-300'>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* //! Filter search */}
            <Filter />

            <View className='flex flex-row gap-5 mt-5'>

                <Card />
                <Card />
            </View>



        </SafeAreaView>
    )
}

export default index