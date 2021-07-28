import { Dimensions } from 'react-native';
import Colors from './colors';

const { width, height } = Dimensions.get('window');
const w = width/4;

export default {
    small: {
        width: w,
        height: 30,
        borderWidth: 1, 
        borderRadius: 0,
        borderColor: Colors.white,
        backgroundColor: Colors.LightBlue[500],
    },
    medium: {
        width: 2*w,
        height: 40,
        borderWidth: 2, 
        borderRadius: 5,
        borderColor: Colors.LightBlue[500],
    },
    large: {
        width: 3*w,
        height: 50,
        borderWidth: 2, 
        borderRadius: 5,
        borderColor: Colors.LightBlue[500],
    }
}