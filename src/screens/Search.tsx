import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const Search: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); // Use any[] type for data
  const [error, setError] = useState<any>(null); // Use any type for error
  const [fullData, setFullData] = useState<any[]>([]); // Use any[] type for fullData
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    fetchData(require('C:\\Users\\mateo\\Documents\\SDU Denmark\\Mobile Software Development\\CarRental\\CarRental-1\\src\\database\\db.json'));
  }, []);

  const fetchData = (localData: any) => { // Add type annotation for localData
    try {
      setData(localData.bookings);
      setFullData(localData.bookings);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  }; 

  const handleSearch = (query: string) => { // Add type annotation for query
    setSearchQuery(query);
    const filtered = fullData.filter((item) =>
      item.model.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase()) ||
      item.startDate.includes(query) ||
      item.endDate.includes(query) ||
      item.brand.toLowerCase().includes(query.toLowerCase())
      
    );
    setData(filtered);
  };


  if( isLoading ) {
    return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={('large')} color="#5500dc" />
    </View>
    )
  }

  if( error ) {
    return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>
        Error in fetching data ... Please check your internet connection!
      </Text>
    </View>
    )
  }

  return (
    <View style={{flex:1,marginHorizontal:20}}>
      <TextInput 
        placeholder='Search' 
        clearButtonMode='always' 
        style={styles.searchBox}
        autoCapitalize='none'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

<FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.model}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Start Date: {item.startDate}</Text>
            <Text>End Date: {item.endDate}</Text>
            <Text>{item.brand}</Text>

            {/* Display other information as needed */}
            <Image source={{ uri: item.pictures[0].srcUrl }} style={{ width: 50, height: 50 }} />
          </View>
        )}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal:20,
    paddingVertical:5, 
    borderColor:'#ccc', 
    borderWidth:1, 
    borderRadius:8
  },
});


export default Search;


//const API_ENDPOINT = 'https://randomuser.me/api/?results=30';

    //fetchData(API_ENDPOINT)

 // const fetchData = async(url) => {
   // try {
     // const response = await fetch(url);
      //const json = await response.json();
      //setData(json.results);

      //console.log(json.results);

      //setIsLoading(false);
    //} catch(error) {
      //setError(error);
      //console.log(error)
      //setIsLoading(false);
    //}
  //}

 //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 //<Text>Overview Content</Text>
 //</View>