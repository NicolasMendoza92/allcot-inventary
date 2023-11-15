
import HomeStats from "@/components/HomeStats";
import UserInfo from "@/components/UserInfo";
import Layout from "@/components/layout";
import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";
import Project from "@/models/Projects";
import HomeStats2 from "@/components/HomeStats2";


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

  return (
    <Layout>
      <UserInfo/>
      <HomeStats2 projects={projects}/>
      <HomeStats operations={operations}/>
    </Layout>
  )
}