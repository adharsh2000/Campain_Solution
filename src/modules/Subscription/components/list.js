import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import subscriptionService from "../../../services/subscriptionService";
import { subscriptionMockData } from "../../client/MockData";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);

  async function fetchSubscription() {
    subscriptionService
      .getSubscription()
      .then(async (response) => {
        console.dir(response);
        await setSubscriptions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while fetching Subscriptions!",
          "Error!"
        );
      });
    setSubscriptions(subscriptionMockData);
  }

  useEffect(() => {
    fetchSubscription();
  }, []);

  // const handleDelete = (id) => {
  //   const updatedSubscriptions = subscriptions.filter(
  //     (subscription) => subscription.id !== id
  //   );
  //   setSubscriptions(updatedSubscriptions);
  // };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    subscriptionService
      .deleteSubscription(id)
      .then(async (response) => {
        console.dir(response);
        fetchSubscription();
        NotificationManager.success("Deleted successfully!", "Success!");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while deleting Subscription!",
          "Error!"
        );
      });
  };

  return (
    <div>
      {subscriptions.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Customer Name</th>
              <th>Expiry Date</th>
              <th>Plan</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {subscriptions.map((subscription, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  className={"clickable-row ".concat(
                    selectedRow === index ? "selected" : ""
                  )}
                >
                  {/* <tr key={subscription.id}> */}
                  {/* <td>
                  <input type="checkbox" />
                </td> */}
                  <td>{subscription.name}</td>
                  <td>{subscription.expiryDate}</td>
                  <td>{subscription.plan}</td>
                  <td>
                    <span
                      onClick={() => {
                        handleDelete(subscription.id, subscription.name);
                      }}
                    >
                      <i class="menu-icon tf-icons bx bx-trash"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No subscriptions found.</p>
      )}
    </div>
  );
};

export default SubscriptionList;
