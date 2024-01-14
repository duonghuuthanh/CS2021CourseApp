import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react/cjs/react.production.min";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import API, { endpoints } from "./configs/API";
import React from 'react'
import Lesson from "./components/Lesson/Lesson";
import LessonDetails from "./components/Lesson/LessonDetails";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={MyDrawerItem}>
        <Drawer.Screen name="Home" component={Home} options={{title: 'Khóa học'}} />
        <Drawer.Screen name="Lesson" component={Lesson} options={{title: "Bài học", drawerItemStyle: {display: "none"}}} />
        <Drawer.Screen name="LessonDetails" component={LessonDetails} options={{title: "Chi tiết bài học", drawerItemStyle: {display: "none"}}} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const MyDrawerItem = (props) => {
  const [categories, setCategories] = React.useState(null);

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        let res = await API.get(endpoints['categories']);
        setCategories(res.data);
      } catch (ex) {
        setCategories([])
        console.error(ex);
      }
    }

    loadCategories();

  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {categories===null?<ActivityIndicator />:<>
        {categories.map(c => <DrawerItem key={c.id} label={c.name} onPress={() => props.navigation.navigate("Home", {"cateId": c.id})} />)}
      </>}
    </DrawerContentScrollView>
  );
}

export default App;