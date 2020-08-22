import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const Index = () => {
  const inProgress = () => (
    <View style={styles.scene}>
      <Text>screen 1</Text>
    </View>
  );

  const Delivery = () => (
    <View style={styles.scene}>
      <Text>screen 2</Text>
    </View>
  );

  const Delivered = () => (
    <View style={styles.scene}>
      <Text>screen 3</Text>
    </View>
  );

  const Canceled = () => (
    <View style={styles.scene}>
      <Text>screen 4</Text>
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Đang Chờ Xử Lí' },
    { key: 'second', title: 'Đang Vận Chuyển' },
    { key: 'third', title: 'Đã Nhận' },
    { key: 'fourth', title: 'Đã Huỷ' },
  ]);

  const renderScene = SceneMap({
    first: inProgress,
    second: Delivery,
    third: Delivered,
    fourth: Canceled,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar}
      style={styles.tabView}
      renderLabel={({ route, focused }) => <Text style={styles.tabTitle}>{route.title}</Text>}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Huong Vi Que Nha!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.viewTitle}>
          <Text style={styles.textTitle}>LỊCH SỬ</Text>
        </TouchableOpacity>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19b7b7',
  },
  header: {
    backgroundColor: '#19b7b7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: '#05375a',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    marginRight: 5,
    fontFamily: 'Roboto-bold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  tabView: {
    marginTop: 10,
    backgroundColor: '#19b7b7',
  },
  tabBar: {
    backgroundColor: '#000',
  },
  tabTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});
