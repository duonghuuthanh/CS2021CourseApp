import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

const Home = ({route, navigation}) => {
    const [courses, setCourses] = React.useState(null);
    const cateId = route.params?.cateId;

    React.useEffect(() => {
        const loadCourses = async () => {
            let url = endpoints['courses'];

            if (cateId !== undefined && cateId != null)
                url = `${url}?category_id=${cateId}`

            try {
                let res = await API.get(url);
                setCourses(res.data.results);
            } catch (ex) {
                setCourses([]);
                console.error(ex);
            }
        };

        loadCourses();
    }, [cateId]);

    const goToLesson = (courseId) => {
        navigation.navigate("Lesson", {"courseId": courseId})
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH MỤC KHOÁ HỌC</Text>
            <ScrollView>
                {courses === null ? <ActivityIndicator /> : <>
                    {
                        courses.map(c => (
                            <View style={MyStyles.row} key={c.id}>
                                <TouchableOpacity onPress={() => goToLesson(c.id)}>
                                    <Image source={{ uri: c.image }} style={[MyStyles.m_10, { width: 80, height: 80 }]} />
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => goToLesson(c.id)}>
                                        <Text style={[MyStyles.m_10, MyStyles.title]}>{c.subject}</Text>
                                    </TouchableOpacity>
                                    <Text style={MyStyles.m_10}>{moment(c.created_date).fromNow()}</Text>
                                </View>
                                
                            </View>
                        ))
                    }
                </>}
            </ScrollView>
        </View>
    );
}

export default Home