import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ meals }) {
    const navigation = useNavigation();
  
    return (
      <View className="mx-4 space-y-3">
        <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
          Recommendations
        </Text>
        <View>
          {meals.length === 0 ? (
            <Loading size="large" className="mt-20" />
          ) : (
            <MasonryList
              data={meals}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation} />}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
            />
          )}
        </View>
      </View>
    );
  }

  const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 === 0;
  
    // Ensure that item is defined and has the necessary properties
    if (!item || typeof item !== 'object') {
      return null; // or handle this case as needed
    }
  
    const { image, Name, Difficulty, CookingTime } = item;
  
    return (
      <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
        <Pressable
          style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
          className="flex justify-center mb-4 space-y-1"
          onPress={() => navigation.navigate('RecipeDetail', { ...item })}
        >
          {/* Ensure that Image is defined */}
          {Image && (
            <Image source={{ uri: image }} style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }} />
          )}
  
          <Text style={{ fontSize: hp(1.5) }} className="font-semibold ml-2 text-neutral-600">
            {Name && Name.length > 20 ? `${Name.slice(0, 20)}...` : Name}
          </Text>
  
        </Pressable>
      </Animated.View>
    );
  };
  
  