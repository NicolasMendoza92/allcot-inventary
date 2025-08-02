
import HomeStats from "@/components/HomeStats";
import UserInfo from "@/components/UserInfo";
import Layout from "@/components/layout";
import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";
import Project from "@/models/Projects";
import HomeStandard from "@/components/HomeStandard";
import HomeRegulated from "@/components/HomeRegulated";
import HomeButtons from "@/components/HomeButtons";
import HomeTD from "@/components/HomeTD";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { '_id': -1 } });
  const projects = await Project.find({}, null, { sort: { '_id': -1 } });
  return {
      props: {
          operations: JSON.parse(JSON.stringify(operations)),
          projects: JSON.parse(JSON.stringify(projects)),
      }
  };
}

export default function Home({operations, projects}) {
  const { data: session } = useSession();
  const router = useRouter();
  function goToLogin() {
    router.push("/login");
  }

  const projectsOk = projects.filter(proj => proj.status != "On hold");

  if (!session) {
    return (
      <div className="flex justify-center">
        <div className="shadow-md p-3 bg-zinc-300/10 flex items-center gap-2 m-3">
          <h1>You must be logged to see the dashboard</h1>
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
      <UserInfo/>
       <HomeStandard projects={projectsOk} operations={operations}/>
      <HomeButtons projects={projectsOk}/>
      {session?.user.email === "demo@gmail.com" ? <></> : <><HomeRegulated projects={projectsOk} /> <HomeTD projects={projectsOk} />
      <HomeStats operations={operations}/> </>}
      
    </Layout>
  )
}