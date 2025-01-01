import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../Components/Colors";
import { Ionicons } from "@expo/vector-icons";
import TextStyles from "../Style/TextStyles";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { SafeAreaView } from "react-native";
import { API_BASE_URL, CHANGEORDERSTATUS_ENDPOINT } from "../Constants/Constants";

const Complaint = () => {

    const route = useRoute();
    const orderNumber = route.params?.orderNumber || '';
    const order_Id = route.params?.order_Id || '';
    const outletName = route.params?.outletName || '';

    const { setUserData, fontFamilies, userData } = useContext(GlobalStateContext);
    const navigation = useNavigation();

    const [issue, setIssue] = useState('');
    // const [orderNumber, setOrderNumber] = useState('');
    // const [outletName, setOutletName] = useState(''); // Outlet name passed as prop
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = issue.length > 5

    const changeOrderStatus = async (orderId, newStatus, issue) => {
        if (!isFormValid) {
            Alert.alert("Please provide a valid complaint and order number.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}:${CHANGEORDERSTATUS_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, newStatus, issue }),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                navigation.goBack(); 
            } else {
                console.error('Error declining order:', data);
            }
        } catch (error) {
            console.error('Error declining order:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.colors.backGroundColor }}>
            <StatusBar hidden={false} backgroundColor={Colors.dark.colors.backGroundColor} />

            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                </TouchableOpacity>
                <Text style={[TextStyles.h2, { marginLeft: 16, color: Colors.dark.colors.mainTextColor }]}>
                    File a Complaint
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={[TextStyles.h4, { color: Colors.dark.colors.textColor, marginBottom: 8 }]}>
                    We are sorry for the inconvenience caused. Please provide the details below to help us resolve your issue.
                </Text>

                {/* Outlet Name */}
                <View style={styles.inputContainer}>
                    <Text style={[TextStyles.h5, { color: Colors.dark.colors.textColor }]}>Outlet Name</Text>
                    <TextInput
                        style={styles.input}
                        value={outletName}
                        placeholder="Enter the outlet name"
                        editable={false} // Outlet name is passed and cannot be edited
                    />
                </View>

                {/* Order Number */}
                <View style={styles.inputContainer}>
                    <Text style={[TextStyles.h5, { color: Colors.dark.colors.textColor }]}>Order Number</Text>
                    <TextInput
                        style={styles.input}
                        value={orderNumber}
                        placeholder="Enter the outlet name"
                        editable={false} // Outlet name is passed and cannot be edited
                    />
                </View>

                {/* Complaint Description */}
                <View style={styles.inputContainer}>
                    <Text style={[TextStyles.h5, { color: Colors.dark.colors.textColor }]}>Complaint Details</Text>
                    <TextInput
                        style={[styles.input, { height: 120 }]}
                        value={issue}
                        onChangeText={setIssue}
                        multiline
                        placeholderTextColor={Colors.dark.colors.textColor}
                        placeholder="Please describe the issue with your order in detail (at least 50 characters)."
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: isFormValid ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.secComponentColor }]}
                    onPress={() => changeOrderStatus(order_Id, "Complaint_Registered", issue)}
                    disabled={!isFormValid || isSubmitting}
                >
                    <Text style={[TextStyles.h5, { color: Colors.dark.colors.mainTextColor }]}>
                        {isSubmitting ? "Submitting..." : "Submit Complaint"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.dark.colors.secComponentColor,
        paddingHorizontal: 12,
        marginTop: 8,
        color: Colors.dark.colors.mainTextColor,
        backgroundColor: Colors.dark.colors.componentColor,
    },
    submitButton: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
});

export default Complaint;
