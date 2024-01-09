import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";

const Home = () => {
    const [courses, setCourses] = React.useState(null);

    React.useEffect(() => {
        const loadCourses = async () => {
            try {
                let res = await API.get(endpoints['courses']);
                setCourses(res.data.results);
            } catch (ex) {
                setCourses([]);
                console.error(ex);
            }
        };

        loadCourses();
    }, []);

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH MỤC KHOÁ HỌC</Text>
            <ScrollView>
                {courses === null ? <ActivityIndicator /> : <>
                    {
                        courses.map(c => (
                            <View style={MyStyles.row} key={c.id}>
                                <Image source={{ uri: c.image }} style={[MyStyles.m_10, { width: 80, height: 80 }]} />
                                <Text style={[MyStyles.m_10, MyStyles.title]}>{c.subject}</Text>
                            </View>
                        ))
                    }
                </>}
            </ScrollView>
        </View>
    );
}

export default Home