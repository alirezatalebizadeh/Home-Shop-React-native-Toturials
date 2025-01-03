import React, { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { Text, TouchableOpacity, ScrollView } from 'react-native'
import { categories } from '@/constants/data'

const Filter = () => {
    const params = useLocalSearchParams<{ filter?: string }>()
    const [selectedCategory, setSelectedCategory] =
        useState(params.filter || "All")

    const handleCategoryPress = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory("");
            router.setParams({ filter: "" });
            return;

        }
        console.log(params.filter);


        setSelectedCategory(category)
        router.setParams({ filter: category })
    }


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 mb-2 w-full px-2">
            {categories.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handleCategoryPress(item.category)}
                    key={index}
                    className={`flex flex-col items-center justify-center mr-4 
                    px-4 py-2 rounded-full ${selectedCategory === item.category ?
                            "bg-primary-300" :
                            "bg-primary-100 border border-primary-200"}`}>
                    <Text className={`text-sm ${selectedCategory === item.category ?
                        "text-white" :
                        "text-black-300 font-rubik"}`}>{item.category}</Text>
                </TouchableOpacity>
            ))}


        </ScrollView>
    )
}

export default Filter