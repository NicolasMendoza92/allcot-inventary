
import { TableOperations } from '@/components/TableOperations'
import Layout from '@/components/layout'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SearchOperations() {
    const { data: session } = useSession();
    const router = useRouter();
    function goToLogin() {
        router.push("/login");
      }

    if (!session) {
        return (
          <div className="flex justify-center">
            <div className="shadow-md p-3 bg-zinc-300/10 flex items-center gap-2 m-3">
              <h1>You must be logged in to handle reservations</h1>
              <button
                className="bg-green-600 rounded-lg text-white font-bold px-6 py-2"
                onClick={goToLogin}
              >
                Login
              </button>
            </div>
          </div>
        );
      }

    return (
        <Layout>
           <TableOperations/>
        </Layout>
    )
}
