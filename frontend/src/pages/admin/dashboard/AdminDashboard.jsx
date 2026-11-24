import {
  Building2,
  Store,
  UtensilsCrossed,
  Contact,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getRequest } from "../../../api/apiRequest";
import { showToast } from "../../../utils/customToast";
import useAuthStore from "../../../store/authStore";

const AdminDashboard = () => {
  const [totalRestaurant, setTotalRestaurant] = useState(0);
  const [totalBranch, setTotalBranch] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalContact, setTotalContact] = useState(0);
  const [totalCatering, setTotalCatering] = useState(0);
  const { user } = useAuthStore((state) => state.user);

  const getRestaurant = async () => {
    try {
      const response = await getRequest("/restaurant/");
      const restaurants = response?.data || [];
      setTotalRestaurant(restaurants.length);
    } catch (error) {
      showToast({ error });
    }
  };

  const getBranch = async () => {
    try {
      const response = await getRequest("/restaurant/branch/");
      const branches = response?.data || [];
      setTotalBranch(branches.length);
    } catch (error) {
      showToast({ error });
    }
  };

  const getMenu = async () => {
    try {
      const response = await getRequest("/menu/");
      const menus = response?.data || [];
      setTotalMenu(menus.length);
    } catch (error) {
      showToast({ error });
    }
  };

  const getContact = async () => {
    try {
      const response = await getRequest("/contact/list/");
      const contacts = response?.data || [];
      setTotalContact(contacts.length);
    } catch (error) {
      showToast({ error });
    }
  };

  const getCatering = async () => {
    try {
      const response = await getRequest("/catering/list/");
      const catering = response?.data || [];
      setTotalCatering(catering.length);
    } catch (error) {
      showToast({ error });
    }
  };

  useEffect(() => {
    getRestaurant();
    getBranch();
    getMenu();
    getContact();
    getCatering();
  }, []);

  const menuCards = [
    {
      title: "Restaurants",
      description: "Manage restaurants",
      count: totalRestaurant,
      icon: Store,
    },
    {
      title: "Branches",
      description: "Manage branches",
      count: totalBranch,
      icon: Building2,
    },
    {
      title: "Menus",
      description: "Manage menus",
      count: totalMenu,
      icon: UtensilsCrossed,
    },
    {
      title: "Contacts",
      description: "Manage contacts",
      count: totalContact,
      icon: Contact,
    },
    {
      title: "Caterings",
      description: "Manage catering",
      count: totalCatering,
      icon: Utensils,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Quick Access
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menuCards.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/20 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-white">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {item.title}
                  </h4>

                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-secondary">
                    {item.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
