import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import List from './Components/List';
import {styles} from './App.style';
import Api from './Api';

type DataType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

function App(): React.JSX.Element {
  const [data, setData] = useState<DataType[]>([]);
  const Endpoints = {
    products: '/products',
  };

  const fetchData = async () => {
    try {
      const response = await Api.GET(Endpoints.products, {});
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.debug(data);
  }, []);

  const mockData = [
    {
      id: 0,
      title: 'Loading...',
      price: 0,
      description: 'Loading...',
      category: 'Loading...',
      image: 'https://via.placeholder.com/150',
      rating: {rate: 0, count: 0},
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data.length > 0 ? data : mockData}
        renderItem={({item}) => <List data={[item]} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

export default App;
