import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title }:
    { focused: boolean, icon: ImageSourcePropType, title: string }) => {
    return <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image
            source={icon}
            tintColor={focused ? "#0061ff" : "#666867"}
            resizeMode='contain'
            className='size-5'
        />
        <Text
            className={`${focused ? "text-primary-300 font-rubik-medium" :
                "text-black-200 font-rubik"} text-xs w-full 
            text-center mt-1`}>
            {title}
        </Text>
    </View>
}



const Tablayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    borderTopColor: "#0061FF1A",
                    borderTopWidth: 1,
                    minHeight: 70,
                }
            }}>

            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.home}
                            focused={focused}
                            title='Home' />
                    )
                }
                }
            />

            <Tabs.Screen
                name='explore'
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.search}
                            focused={focused}
                            title='Explore' />
                    )
                }
                }
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.person}
                            focused={focused}
                            title='Profile' />
                    )
                }
                }
            />

        </Tabs >
    )
}

export default Tablayout