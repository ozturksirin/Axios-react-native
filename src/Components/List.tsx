import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type ListItem = {
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

type Props = {
  data: ListItem[];
};

const List = (props: Props) => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <Image source={{uri: data[0]?.image}} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleArea}>
          <Text style={styles.text}>{data[0]?.title.slice(0, 20)}</Text>
          <Text style={styles.text}>{data[0]?.price} $</Text>
        </View>
        <Text style={[styles.description, styles.text]}>
          {data[0]?.description.slice(0, 10)}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.text}>{data[0]?.category}</Text>
          <View>
            <Text style={styles.text}>Rate: {data[0]?.rating.rate}</Text>
            <Text style={styles.text}>Count: {data[0]?.rating.count}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
    aspectRatio: 1,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    flexWrap: 'wrap',
    overflow: 'hidden',
    maxWidth: 'auto',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 'auto',
    height: 'auto',
  },
});
