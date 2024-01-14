import { View, Text, ActivityIndicator, Image } from "react-native"
import MyStyles from "../../styles/MyStyles"
import React from 'react'
import API, { endpoints } from "../../configs/API";
import Styles from "./Styles";
import RenderHTML from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

const LessonDetails = ({route}) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const {lessonId} = route.params;

    React.useEffect(() => {
        const loadLesson = async () => {
            try {
                let res = await API.get(endpoints['lesson-details'](lessonId));
                setLesson(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        const loadComments = async () => {
            try {
                let res = await API.get(endpoints['comments'](lessonId));
                setComments(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadLesson();
        loadComments();
    }, [lessonId]);

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>CHI TIẾT BÀI HỌC</Text>
            {lesson===null?<ActivityIndicator />:<>
                <View style={MyStyles.row}>
                    <Image style={[Styles.img, MyStyles.m_10]} source={{uri: lesson.image}} />
                    <View>
                        <Text style={[MyStyles.title, MyStyles.m_10]}>{lesson.subject}</Text>
                        <View style={MyStyles.row}>
                            {lesson.tags.map(t => <Text style={Styles.tag} key={t.id}>{t.name}</Text>)}
                        </View>
                    </View>
                    
                </View>
                <ScrollView>
                    <RenderHTML source={{html: lesson.content}} />
                </ScrollView>
                <ScrollView>
                {comments===null?<ActivityIndicator />:<>
                    {comments.map(c => <View style={MyStyles.row} key={c.id}>
                        <Image source={{uri: c.user.image}} style={[MyStyles.m_10, Styles.thumb]} />
                        <View>
                            <Text style={MyStyles.m_10}>{c.content}</Text>
                            <Text style={MyStyles.m_10}>{moment(c.created_date).fromNow()}</Text>
                        </View>
                    </View>)}
                </>}
                </ScrollView>
            </>}
        </View>
    )
}

export default LessonDetails