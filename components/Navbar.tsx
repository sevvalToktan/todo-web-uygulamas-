import { useState, useEffect } from 'react';
import { firestore, firebaseAuth } from '../firebase/client';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

    // Tamamlanmış ve tamamlanmamış görevlerin sayısını saklamak için durum değişkenleri
const NavBar: React.FC = () => {
    const [completedCount, setCompletedCount] = useState(0);
    const [incompleteCount, setIncompleteCount] = useState(0);

        // Şu anda kimlik doğrulaması yapılmış kullanıcıyı aldığımız yer

    const user = firebaseAuth.currentUser;

    useEffect(() => {
        if (user) {
                        // Firestore'dan, kullanıcıya ait görevleri almak için sorgu oluşturulur
            const q = query(collection(firestore, 'tasks'), where('userId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let completed = 0;
                let incomplete = 0;
                                // Gelen verileri işlenen yer
                querySnapshot.forEach((doc) => {
                    const task = doc.data();
                    if (task.completed) {
                        completed++;
                    } else {
                        incomplete++;
                    }
                });
                setCompletedCount(completed);
                setIncompleteCount(incomplete);
            });
            return () => unsubscribe();
        }
    }, [user]);

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="flex justify-between">
                <span>Completed: {completedCount}</span>
                <span>Incomplete: {incompleteCount}</span>
            </div>
        </nav>
    );
};

export default NavBar;
