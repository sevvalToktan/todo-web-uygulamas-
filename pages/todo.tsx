import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth, firestore } from '../firebase/client';
import { collection, query, where, addDoc, onSnapshot, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date; 
}

const ToDoList: React.FC = () => {
    // Görev ekleme formu için durum değişkeni
    const [task, setTask] = useState('');
    // Görevler listesini saklamak için durum değişkeni
    const [tasks, setTasks] = useState<Task[]>([]);
    // Yüklenme durumunu saklamak için durum değişkeni
    const [loading, setLoading] = useState(true);
    // Kullanıcı durumu ve yüklenme durumunu almak için useAuthState kullanımı
    const [user, userLoading] = useAuthState(firebaseAuth);
    // Aktif sekmeyi belirlemek için durum değişkeni
    const [tab, setTab] = useState<'completed' | 'incomplete'>('incomplete');
    // Görevleri aramak için durum değişkeni
    const [searchTerm, setSearchTerm] = useState('');
    // Next.js yönlendirmesi için useRouter kancası
    const router = useRouter();

    useEffect(() => {
        // Yüklenme durumu varsa hiçbir şey yapma
        if (userLoading) return;
        // Kullanıcı yoksa ana sayfaya yönlendir
        if (!user) {
            router.push('/');
            return;
        }

        // Firestore'dan görevleri almak için sorgu oluştur
        const q = query(
            collection(firestore, 'tasks'),
            where('userId', '==', user.uid),
            where('completed', '==', tab === 'completed'), 
            orderBy('createdAt', 'desc') 
        );

        // Gerçek zamanlı güncellemeleri dinle
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData: Task[] = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ id: doc.id, ...doc.data() } as Task);
            });
            console.log('Tasks Data:', tasksData); 
            setTasks(tasksData);
            setLoading(false);
        }, (error) => {
            console.error('Firestore Error:', error); 
            setLoading(false);
        });

        // Bileşen kaldırıldığında dinleyiciyi temizle
        return () => unsubscribe();
    }, [user, userLoading, router, tab]);

    // Yeni görev ekleme işlevi
    const handleAddTask = async () => {
        if (task.trim() === '') return;

        try {
            await addDoc(collection(firestore, 'tasks'), {
                title: task,
                completed: false,
                userId: user?.uid,
                createdAt: new Date() 
            });
            setTask('');
        } catch (error) {
            console.error('Add Task Error:', error); 
        }
    };

    // Görev tamamlanma durumunu değiştirme işlevi
    const handleToggleComplete = async (id: string, completed: boolean) => {
        const taskDoc = doc(firestore, 'tasks', id);
        try {
            await updateDoc(taskDoc, { completed: !completed });
        } catch (error) {
            console.error('Update Task Error:', error); 
        }
    };

    // Görevi silme işlevi
    const handleDeleteTask = async (id: string) => {
        const taskDoc = doc(firestore, 'tasks', id);
        try {
            await deleteDoc(taskDoc);
        } catch (error) {
            console.error('Delete Task Error:', error); 
        }
    };

    // Kullanıcı çıkış yapma işlevi
    const handleLogout = async () => {
        await firebaseAuth.signOut();
        router.push('/');
    };

    // Görevleri arama terimine göre filtreleme
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="absolute top-4 right-4">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <h1 className="text-4xl mb-6">To-Do List</h1>
            <div className="mb-6 space-y-4 w-full max-w-md">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={handleAddTask}
                >
                    Add Task
                </button>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Search tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mb-6 space-x-2">
                <button
                    className={`py-1 px-2 rounded ${tab === 'incomplete' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setTab('incomplete')}
                >
                    Incomplete
                </button>
                <button
                    className={`py-1 px-2 rounded ${tab === 'completed' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setTab('completed')}
                >
                    Complete
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="w-full max-w-md">
                    {filteredTasks.map((task) => (
                        <li key={task.id} className="mb-2 flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task.id, task.completed)}
                                className="mr-2"
                            />
                            {task.title}
                            <button
                                className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-auto"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ToDoList;
