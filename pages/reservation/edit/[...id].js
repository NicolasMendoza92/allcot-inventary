import ReservForm from '@/components/ReservForm';
import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function EditReservePage() {

    // traemos la informacion del producto 
    const [reservInfo, setReservInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    // traemos la propiedad id, de router.query, ya que nos fiamos previamente con un console log donde estaba el file [...id]  que creamos con console.log({router});
    const { id } = router.query;
    const relatedProjectID = reservInfo?.projectRelated


    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios.get('/api/reservations?id=' + id).then(response => {
            setReservInfo(response.data);
            setIsLoading(false);
        })
    }, [id]);


    return (
        <Layout>

            <div className="flex justify-between content-center">
                <div>
                    <p> Edit reservation </p>
                </div>
                <div className='flex gap-2'>
                    <button className="bg-gray-300 text-white p-2" >
                        <Link href={'/reservations'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </Link>
                    </button>
                </div>
            </div>
            {
                isLoading && (
                    <div className='flex justify-center w-full'>
                        <Spinner />
                    </div>

                )
            }
            {
                reservInfo && (
                    <ReservForm {...reservInfo} relatedProjectID={relatedProjectID} />
                )
            }

        </Layout >
    );
}