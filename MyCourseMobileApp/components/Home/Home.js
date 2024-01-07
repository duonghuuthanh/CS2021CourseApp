import React from "react"
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image } from "react-native"
import { useEffect, useState } from "react/cjs/react.production.min"
import API, { endpoints } from "../../configs/API"
import MyStyles from "../../styles/MyStyles"
import Styles from "./Styles"


const Home = () => {
    const [courses, setCourses] = React.useState(null)

    React.useEffect(() => {
        const loadCourses = async () => {
            try {
                let res = await API.get(endpoints['courses']);
                setCourses(res.data.results)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadCourses();
    }, []);

    return (
        <View style={{marginTop: 50}}>
           
            <ScrollView>
            {courses===null?<ActivityIndicator/>:<>
                {courses.map(c => (
                    <View  key={c.id} style={{flex: 1, flexDirection: "row"}}>
                        <Image style={{width:60, height: 60, margin: 10}} source={{uri: c.image}} />
                        <TouchableOpacity>
                        <Text style={{margin: 10}}>{c.subject}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </>}
            </ScrollView>
        </View>
    )
}

export default Home