import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingItemsProp {
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean
}

const SettingIcons = ({ icon, title, onPress, textStyle, showArrow = true }: SettingItemsProp) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon}
                    className='size-6'
                />
                <Text className={`text-lg font-rubik-medium text-black-300  ${textStyle}`}>{title}</Text>
            </View>
            {showArrow && <Image
                source={icons.rightArrow}
                className='size-5'
            />}
        </TouchableOpacity>
    )
}

const Profile = () => {

    const { user, refetch } = useGlobalContext();
    console.log("User Profile = ", user);


    const handleLogout = async () => {
        const result = await logout()

        if (result) {
            Alert.alert("Success", "You have been logged out successfully")

            refetch()
        } else {
            Alert.alert("Error", "An error occurred while  logging out")
        }
    }

    return (
        <SafeAreaView className='h-full bg-white '>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                {/* //! Top bar */}
                <View
                    className='flex flex-row items-center
                 justify-between mt-5'>

                    <Text className='text-xl font-rubik-bold'>Profile</Text>
                    <Image source={icons.bell} className="size-5" />
                </View>
                {/* //! profile image */}
                <View
                    className='flex flex-row  justify-center mt-5'>
                    <View className='flex flex-col justify-center  relative mt-5'>
                        <Image source={images.avatar} className='size-44 relative rounded-full' />
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image
                                source={icons.edit}
                                className='size-9'
                            />
                        </TouchableOpacity>
                        <Text
                            className='text-xl font-rubik-bold mt-2 '>{user?.name ? user.name : "Alireza | React Native"}</Text>
                    </View>

                </View>

                {/* //! Links */}
                <View className='flex flex-col mt-10'>
                    <SettingIcons icon={icons.calendar} title="My Booking" />
                    <SettingIcons icon={icons.wallet} title="Payments" />
                </View>

                <View
                    className='flex flex-col mt-5 border-t pt-5
                     border-primary-200'>
                    {settings.slice(2).map((item, index) => (
                        <SettingIcons {...item} key={index} />
                    ))}
                </View>

                <View
                    className='flex flex-col mt-5 border-t pt-5
                     border-primary-200'>
                    <SettingIcons
                        icon={icons.logout}
                        title='Logout'
                        textStyle='text-danger'
                        showArrow={false}
                        onPress={handleLogout}
                    />
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

export default Profile