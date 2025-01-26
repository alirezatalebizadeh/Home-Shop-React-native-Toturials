import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeturedCard } from '@/components/Cards'
import Filter from '@/components/Filter'
import { useGlobalContext } from '@/lib/global-provider'
import { useAppwrite } from '@/lib/useAppwrite'
import { getLatestProperties, getProperties } from '@/lib/appwrite'
import NoResults from '@/components/NoResults'

const index = () => {
    const { user } = useGlobalContext()
    const params = useLocalSearchParams<{
        query?: string;
        filter?: string
    }>()

    const { data: latestProperties, loading } = useAppwrite({ fn: getLatestProperties })


    const {
        data: properties,
        refetch

    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6
        },
        skip: true
    })


    useEffect(() => {

        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6
        })

    }, [params.filter, params.query])

    const handleCardPress = (cardId: any) => {
        console.log("card click");

    }




    return (
        <SafeAreaView className='bg-white h-full px-2'>
            {/* <Button title='seen' onPress={getLatestProperties} /> */}
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => (
                    <Card item={item} onPress={() => handleCardPress(item)} />
                )}
                keyExtractor={(item) => item.toString()}
                contentContainerClassName='pb-32'
                columnWrapperClassName='flex gap-5 mt-5'
                numColumns={2}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size="large"
                            className='text-primary-300 mt-5' />
                    ) : <NoResults />
                }
                //! Header component => First Component in List
                ListHeaderComponent={() => (
                    <View className='px-5'>
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
                        <FlatList
                            data={[5, 6, 7, 8]}
                            renderItem={({ item }) => <FeturedCard item={item} />}
                            keyExtractor={(item) => item.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName='flex gap-5 mt-5'
                        />



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
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

export default index