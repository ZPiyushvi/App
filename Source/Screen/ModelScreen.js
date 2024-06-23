import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';

export default function ModelScreen() {
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const RenderModel = () => (
        <Modal
            visible={visible}
            onRequestClose={hide}
            animationType="fade"
            transparent
        >
            <TouchableOpacity style={{ height: 100, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onPress={hide} />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Button title="Hide" onPress={hide} />
            </View>
        </Modal>
        // <Modal
        //     visible={visible}
        //     onRequestClose={hide}
        //     animationType="fade"
        //     transparent
        // >
        //     <TouchableOpacity style={{ flex: 1 }} onPress={hide}>
        //         <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        //             <View style={{ height: 400, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        //                 <Button title="Hide" onPress={hide} />
        //             </View>
        //         </View>
        //     </TouchableOpacity>
        // </Modal>
    );

    return { show, hide, RenderModel };
}
