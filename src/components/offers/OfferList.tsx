import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, DatabaseBackup } from 'lucide-react';
import { Offer } from '../../types/offers';
import { formatCurrency, toTitleCase } from '../../utils/formatters';
import { getStatusColor } from '../../utils/styleHelpers';

interface OfferListProps {
  offers: Offer[];
  onEdit: (offer: Offer) => void;
  onDelete: (offer: Offer) => void;
  onDeleteAll: () => void;
}

export default function OfferList({ offers, onEdit, onDelete, onDeleteAll }: OfferListProps) {
  const calculateTotalValue = (offer: Offer): number => {
    // Calculate platform license total
    const platformTotal = offer.environments.reduce((envSum, env) => {
      const envMonthlyTotal = env.components.reduce((compSum, comp) => 
        compSum + (Math.ceil(comp.monthlyPrice || 0) * (comp.quantity || 1)), 0
      );
      return envSum + (envMonthlyTotal * (env.licensePeriod || 12));
    }, 0);

    // Calculate services total
    const servicesTotal = offer.services.reduce((sum, service) => 
      sum + (service.total || 0), 0
    );

    return platformTotal + servicesTotal;
  };

  if (offers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">No offers yet</h3>
        <p className="mt-2 text-sm text-gray-500">Create your first offer to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={onDeleteAll}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <DatabaseBackup className="h-4 w-4 mr-2" />
          Delete All Offers
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Rep
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {offer.projectName}
                  </div>
                  {offer.offerId && (
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      ID: {offer.offerId}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {offer.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {offer.region}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {offer.salesRepName || 'Not assigned'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatCurrency(calculateTotalValue(offer))}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(offer.status)}`}>
                    {toTitleCase(offer.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/offers/${offer.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(offer)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(offer)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}