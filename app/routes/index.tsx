import { LoaderFunction, redirect, useLoaderData } from "remix";
import Item from "~/components/dashboard/Item";
import { getSession, currentToken } from "~/session";

export default function Index() {
  let company: CompanyData = useLoaderData();

  return (
    <div className="bg-indigo-100 py-20 lg:py-24 h-full">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-medium mb-2">Dashboard</h1>
        </div>
        <div className="lg:flex lg:-mx-2 mt-6 lg:mt-12">
          <Item title="Company Infos">
            <div className="flex flex-row flex-wrap pb-4">
              <img src={company.logo} className="w-fit h-fit pl-2 lg:pl-0"></img>
              <div className="item-body text-left px-4">
                <span className=""><b>Company Name:</b> {company.name}</span><br />
                <span className=""><b>Current Cash:</b> {company.cash}</span><br />
                <span className=""><b>Company Worth:</b> {company.companyValue}</span><br />
                <span className=""><b>Company Rating:</b> {company.rating}</span><br />
                <span className=""><b>Admin overhead:</b> {company.adminOverhead}</span>
              </div>
            </div>
          </Item>
          <Item title="Progress">
            <div className="flex flex-row pb-4">
              <div className="item-body text-left px-4">
                <span className="w-5"><b>Total Buildings:</b> {company.buildings.length}</span><br />
                <span className="w-5"><b>Level:</b> {company.level}</span><br />
                <span className="w-5"><b>Level Progress:</b> {((company.levelPoints / company.neededPoints) * 100).toFixed(2)}% ({company.levelPoints}/{company.neededPoints})</span>
              </div>
            </div>
          </Item>
          <Item title="Contracts">
            <div className="flex flex-row pb-4">
              <div className="item-body text-left px-4">
                <span className="w-5"><b>Open Contracts:</b> {company.contracts.length}</span><br />
                {company.contracts.length > 0 && (
                  <>
                    <span className="w-5"><b>Contract Items:</b> {company.contracts.map(l => `${l.kind}`).join(", ")}</span><br />
                    <span className="w-5"><b>Contract Items:</b> {addbits(company.contracts.map(l => `${l.price*l.quantity}`).join("+"))}</span>
                  </>
                )}
              </div>
            </div>
          </Item>
        </div>
      </div>
    </div>
  );
}

type CompanyData = {
  name: string,
  logo: string,
  cash: string,
  companyValue: string,
  rating: string,
  adminOverhead: string,
  buildings: Building[],
  level: string,
  levelPoints: number,
  neededPoints: number,
  contracts: Contract[]
}

type Contract = {
  kind: string,
  quantity: number,
  price: number,
  quality: number,
  id: number
}

type Building = {
  category: string,
  name: string,
  cost: number,
  id: number,
}

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (!session.has("id"))
    return redirect("/login")

  const token = await currentToken({ request });
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
  });

  let playerResponse = await fetch("https://www.simcompanies.com/api/v2/players/me/", {
    headers: {
      "Cookie": "sessionid=" + token
    }
  })
  let playerJson = await playerResponse.json()

  let companyResponse = await fetch(`https://www.simcompanies.com/api/v2/players-by-company/${playerJson.authUser.company}/`, {
    headers: {
      "Cookie": "sessionid=" + token
    }
  })
  let companyJson = await companyResponse.json()

  let contractResponse = await fetch(`https://www.simcompanies.com/api/v2/contracts-incoming/`, {
    headers: {
      "Cookie": "sessionid=" + token
    }
  })
  let contractJson = await contractResponse.json()

  let returnObj: CompanyData = {
    name: playerJson.authUser.company,
    cash: formatter.format(playerJson.authUser.money),
    logo: playerJson.authUser.logo,
    companyValue: formatter.format(companyJson.player.history.value),
    rating: companyJson.player.rating,
    adminOverhead: `${((companyJson.player.administrationOverhead - 1) * 100).toFixed(2)}%`,
    level: playerJson.levelInfo.level,
    levelPoints: playerJson.levelInfo.experience,
    neededPoints: playerJson.levelInfo.experienceToNextLevel,
    buildings: companyJson.buildings,
    contracts: []
  }

  contractJson.forEach(element => {
    let contract: Contract = {
      kind: element.kind.name,
      quality: element.quality,
      quantity: element.quantity,
      price: element.price,
      id: element.id,
    }
    returnObj.contracts.push(contract);
  });

  return returnObj;
};

function addbits(s: any): number {
  var total = 0,
      s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
      
  while (s.length) {
    total += parseFloat(s.shift());
  }
  return total;
}