import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams, router } from 'expo-router'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeturedCard } from '@/components/Cards'
import Filter from '@/components/Filter'
import { useGlobalContext } from '@/lib/global-provider'
import { useAppwrite } from '@/lib/useAppwrite'
import { getLatestProperties, getProperties } from '@/lib/appwrite'
import NoResults from '@/components/NoResults'

const Explore = () => {
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const {
        data: properties,
        refetch,
        loading,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
        });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);


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
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image source={icons.backArrow} className="size-5" />
                            </TouchableOpacity>

                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                                Search for Your Ideal Home
                            </Text>
                            <Image source={icons.bell} className="w-6 h-6" />
                        </View>

                        <Search />

                        <View className="mt-5">
                            <Filter />

                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                                Found {properties?.length} Properties
                            </Text>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

export default Explore