"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Pill,
  Calendar,
  Clock,
  User,
  FileText,
  Filter,
  Eye,
  Download,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import {
  prescriptionsAdapter,
  usePrescriptionsQuery,
} from "@/adapters/PrescriptionsAdapter";

// Type definition for individual prescription item
interface PrescriptionItem {
  id: string;
  created_at: string;
  updated_at: string | null;
  medication: string;
  patient_id: string;
  dosage: string;
  duration: string;
  frequency: string;
  notes: string;
  service_provider_id: string;
  service_provider: string;
}

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = React.useState<string>("");

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const {
    data: prescriptionsResponse,
    isLoading,
    error,
  } = usePrescriptionsQuery({
    queryCallback: prescriptionsAdapter.getPrescriptions,
    queryKey: ["prescriptions"],
    slug: userId,
  });

  // Extract prescriptions array from API response
  const prescriptions: PrescriptionItem[] = prescriptionsResponse?.data || [];

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.medication
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.service_provider
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF function
  const generatePDF = (prescription: PrescriptionItem) => {
    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription - ${prescription.medication}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 40px;
              background: white;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #1570EF;
              padding-bottom: 20px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #1570EF;
              margin-bottom: 10px;
            }
            .prescription-title {
              font-size: 28px;
              font-weight: bold;
              color: #1D2939;
              margin-bottom: 5px;
            }
            .date {
              color: #667085;
              font-size: 14px;
            }
            .content {
              max-width: 600px;
              margin: 0 auto;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #1D2939;
              margin-bottom: 15px;
              border-bottom: 1px solid #E5E7EB;
              padding-bottom: 5px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding: 8px 0;
            }
            .detail-label {
              font-weight: 600;
              color: #667085;
              min-width: 120px;
            }
            .detail-value {
              font-weight: 500;
              color: #1D2939;
              text-align: right;
            }
            .notes {
              background: #F8FAFC;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #1570EF;
              margin-top: 20px;
            }
            .notes-title {
              font-weight: bold;
              color: #1D2939;
              margin-bottom: 10px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #667085;
              font-size: 12px;
              border-top: 1px solid #E5E7EB;
              padding-top: 20px;
            }
            .stamp {
              position: absolute;
              bottom: 100px;
              right: 50px;
              width: 120px;
              height: 120px;
              border: 3px solid #1570EF;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: rgba(21, 112, 239, 0.05);
              transform: rotate(-15deg);
            }
            .stamp-text {
              color: #1570EF;
              font-weight: bold;
              font-size: 10px;
              text-align: center;
              line-height: 1.2;
            }
            @media print {
              body { margin: 0; }
              .stamp { position: fixed; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
            <svg width="209" height="45" viewBox="0 0 209 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4888 20.1999C12.5968 20.3039 12.683 20.4283 12.7424 20.566C12.8017 20.7037 12.8331 20.8518 12.8346 21.0018C12.8361 21.1517 12.8077 21.3004 12.7512 21.4393C12.6946 21.5781 12.6109 21.7043 12.505 21.8105C12.3992 21.9167 12.2732 22.0007 12.1345 22.0577C11.9958 22.1146 11.8472 22.1434 11.6972 22.1423C11.5473 22.1412 11.3991 22.1103 11.2612 22.0513C11.1234 21.9924 10.9987 21.9065 10.8944 21.7988C10.7894 21.694 10.7061 21.5695 10.6492 21.4324C10.5923 21.2954 10.563 21.1485 10.5629 21.0001C10.5627 20.7005 10.6815 20.413 10.8932 20.201C11.105 19.9889 11.3923 19.8697 11.6919 19.8695C11.9916 19.8693 12.279 19.9881 12.4911 20.1999H12.4888ZM15.6845 17.0064C15.7923 17.1106 15.8784 17.2352 15.9375 17.373C15.9967 17.5107 16.0279 17.6589 16.0292 17.8089C16.0305 17.9588 16.0019 18.1075 15.9451 18.2463C15.8883 18.385 15.8045 18.5111 15.6985 18.6171C15.5925 18.7232 15.4664 18.807 15.3276 18.8638C15.1888 18.9206 15.0401 18.9491 14.8902 18.9478C14.7403 18.9465 14.5921 18.9154 14.4543 18.8562C14.3165 18.797 14.1919 18.711 14.0878 18.6031C13.8821 18.3902 13.7683 18.1049 13.7708 17.8089C13.7734 17.5128 13.8922 17.2296 14.1015 17.0202C14.3109 16.8108 14.5941 16.6921 14.8902 16.6895C15.1863 16.6869 15.4715 16.8007 15.6845 17.0064ZM18.8802 13.813C18.985 13.918 19.0681 14.0426 19.1248 14.1797C19.1815 14.3169 19.2106 14.4638 19.2105 14.6122C19.2104 14.7605 19.1811 14.9074 19.1242 15.0445C19.0673 15.1815 18.984 15.306 18.879 15.4109C18.774 15.5157 18.6494 15.5988 18.5123 15.6555C18.3752 15.7122 18.2282 15.7413 18.0799 15.7412C17.9315 15.7411 17.7846 15.7118 17.6476 15.6549C17.5105 15.598 17.386 15.5147 17.2812 15.4097C17.0755 15.1968 16.9617 14.9115 16.9642 14.6154C16.9668 14.3194 17.0856 14.0361 17.2949 13.8268C17.5043 13.6174 17.7875 13.4986 18.0836 13.4961C18.3797 13.4935 18.6649 13.6073 18.8779 13.813H18.8802ZM18.8802 26.5889C18.985 26.6939 19.0681 26.8185 19.1248 26.9557C19.1815 27.0928 19.2106 27.2397 19.2105 27.3881C19.2104 27.5365 19.1811 27.6834 19.1242 27.8204C19.0673 27.9574 18.984 28.0819 18.879 28.1868C18.774 28.2916 18.6494 28.3748 18.5123 28.4314C18.3752 28.4881 18.2282 28.5172 18.0799 28.5171C17.9315 28.517 17.7846 28.4877 17.6476 28.4308C17.5105 28.374 17.386 28.2906 17.2812 28.1857C17.0755 27.9727 16.9617 27.6874 16.9642 27.3914C16.9668 27.0953 17.0856 26.8121 17.2949 26.6027C17.5043 26.3933 17.7875 26.2746 18.0836 26.272C18.3797 26.2694 18.6649 26.3833 18.8779 26.5889H18.8802ZM22.0713 23.3933C22.2834 23.605 22.4026 23.8923 22.4028 24.192C22.403 24.4916 22.2842 24.7791 22.0724 24.9911C21.8607 25.2031 21.5734 25.3224 21.2738 25.3226C20.9741 25.3228 20.6866 25.204 20.4746 24.9922C20.2689 24.7793 20.1551 24.494 20.1577 24.1979C20.1602 23.9019 20.279 23.6186 20.4884 23.4093C20.6977 23.1999 20.9809 23.0812 21.277 23.0786C21.5731 23.076 21.8583 23.1898 22.0713 23.3955V23.3933ZM25.2647 20.1999C25.3727 20.3039 25.4589 20.4283 25.5183 20.566C25.5776 20.7037 25.609 20.8518 25.6105 21.0018C25.612 21.1517 25.5837 21.3004 25.5271 21.4393C25.4705 21.5781 25.3868 21.7043 25.281 21.8105C25.1751 21.9167 25.0491 22.0007 24.9104 22.0577C24.7718 22.1146 24.6231 22.1434 24.4732 22.1423C24.3232 22.1412 24.175 22.1103 24.0372 22.0513C23.8993 21.9924 23.7746 21.9065 23.6703 21.7988C23.5653 21.694 23.482 21.5695 23.4251 21.4324C23.3682 21.2954 23.3389 21.1485 23.3388 21.0001C23.3386 20.7005 23.4574 20.413 23.6692 20.201C23.8809 19.9889 24.1682 19.8697 24.4678 19.8695C24.7675 19.8693 25.055 19.9881 25.267 20.1999H25.2647ZM15.6845 23.3933C15.7895 23.4981 15.8728 23.6226 15.9297 23.7596C15.9865 23.8967 16.0159 24.0436 16.016 24.192C16.0161 24.3403 15.987 24.4873 15.9303 24.6244C15.8736 24.7615 15.7905 24.8861 15.6856 24.9911C15.5808 25.0961 15.4563 25.1794 15.3192 25.2363C15.1822 25.2932 15.0353 25.3225 14.8869 25.3226C14.7386 25.3227 14.5916 25.2936 14.4545 25.2369C14.3174 25.1802 14.1928 25.0971 14.0878 24.9922C13.8821 24.7793 13.7683 24.494 13.7708 24.1979C13.7734 23.9019 13.8922 23.6186 14.1015 23.4093C14.3109 23.1999 14.5941 23.0812 14.8902 23.0786C15.1863 23.076 15.4715 23.1898 15.6845 23.3955V23.3933ZM18.8802 20.1999C18.9851 20.3048 19.0684 20.4295 19.1252 20.5667C19.1821 20.7038 19.2113 20.8509 19.2113 20.9993C19.2113 21.1478 19.1821 21.2948 19.1252 21.432C19.0684 21.5692 18.9851 21.6938 18.8802 21.7988C18.7752 21.9038 18.6505 21.9871 18.5134 22.0439C18.3762 22.1007 18.2292 22.13 18.0807 22.13C17.9322 22.13 17.7852 22.1007 17.648 22.0439C17.5108 21.9871 17.3862 21.9038 17.2812 21.7988C17.1762 21.694 17.0929 21.5695 17.036 21.4324C16.9791 21.2954 16.9498 21.1485 16.9497 21.0001C16.9495 20.7005 17.0683 20.413 17.2801 20.201C17.4918 19.9889 17.7791 19.8697 18.0787 19.8695C18.3784 19.8693 18.6659 19.9881 18.8779 20.1999H18.8802ZM22.0713 17.0064C22.1792 17.1106 22.2652 17.2352 22.3244 17.373C22.3836 17.5107 22.4147 17.6589 22.416 17.8089C22.4173 17.9588 22.3887 18.1075 22.332 18.2463C22.2752 18.385 22.1913 18.5111 22.0853 18.6171C21.9793 18.7232 21.8532 18.807 21.7144 18.8638C21.5757 18.9206 21.427 18.9491 21.277 18.9478C21.1271 18.9465 20.9789 18.9154 20.8411 18.8562C20.7034 18.797 20.5788 18.711 20.4746 18.6031C20.2689 18.3902 20.1551 18.1049 20.1577 17.8089C20.1602 17.5128 20.279 17.2296 20.4884 17.0202C20.6977 16.8108 20.9809 16.6921 21.277 16.6895C21.5731 16.6869 21.8583 16.8007 22.0713 17.0064Z" fill="black"/>
<path d="M31.8232 7.17555C30.5527 5.90538 28.8297 5.19184 27.0331 5.19184C25.2365 5.19184 23.5135 5.90538 22.243 7.17555L19.6548 9.76597L29.278 19.3869L31.8232 16.7558C33.0934 15.4853 33.8069 13.7622 33.8069 11.9657C33.8069 10.1691 33.0934 8.44611 31.8232 7.17555V7.17555ZM27.6948 20.9994L18.0604 11.3649L8.37397 21.0694L17.9994 30.6948L27.6948 20.9994ZM16.3891 32.278L6.775 22.6639L4.17555 25.2452C2.97159 26.5285 2.31413 28.2299 2.34228 29.9893C2.37044 31.7488 3.08201 33.4282 4.32642 34.6723C5.57083 35.9164 7.25045 36.6276 9.00989 36.6554C10.7693 36.6831 12.4705 36.0252 13.7535 34.821L13.7671 34.8074L16.3869 32.2757L16.3891 32.278ZM5.98229 20.2677L20.644 5.57884C22.3435 3.9149 24.6305 2.98829 27.0089 3.00011C29.3873 3.01193 31.665 3.96122 33.3479 5.64196C35.0307 7.32271 35.9828 9.59929 35.9976 11.9777C36.0123 14.356 35.0885 16.6442 33.4267 18.3457L30.091 21.7989L18.7853 33.1046L15.3457 36.429C13.6442 38.0908 11.356 39.0146 8.97765 38.9998C6.59929 38.9851 4.32271 38.033 2.64196 36.3501C0.961217 34.6673 0.0119284 32.3895 0.000111649 30.0112C-0.0117051 27.6328 0.914904 25.3457 2.57884 23.6463L2.5811 23.6418L5.98004 20.2722L5.98229 20.2677V20.2677Z" fill="black"/>
<path d="M4.17555 7.17518C2.90538 8.44574 2.19184 10.1687 2.19184 11.9653C2.19184 13.7619 2.90538 15.4849 4.17555 16.7554L6.76597 19.3436L16.3869 9.72043L13.7558 7.17518C12.4852 5.90501 10.7622 5.19147 8.96568 5.19147C7.16911 5.19147 5.4461 5.90501 4.17555 7.17518V7.17518ZM17.9994 11.3036L8.36494 20.938L18.0694 30.6244L27.6948 20.999L17.9994 11.3036ZM29.278 22.6093L19.6639 32.2234L22.2452 34.8229C23.5285 36.0268 25.2299 36.6843 26.9893 36.6561C28.7488 36.628 30.4282 35.9164 31.6723 34.672C32.9164 33.4276 33.6276 31.748 33.6554 29.9885C33.6831 28.2291 33.0252 26.5279 31.821 25.2449L31.8074 25.2313L29.2757 22.6115L29.278 22.6093ZM17.2677 33.0161L2.57884 18.3544C0.914903 16.655 -0.0117062 14.3679 0.000110468 11.9895C0.0119271 9.61113 0.961216 7.33337 2.64196 5.65054C4.32271 3.96771 6.59929 3.01561 8.97765 3.00085C11.356 2.98609 13.6442 3.90986 15.3457 5.5717L18.7989 8.9074L30.1046 20.2131L33.429 23.6527C35.0908 25.3542 36.0146 27.6424 35.9998 30.0208C35.9851 32.3991 35.033 34.6757 33.3501 36.3564C31.6673 38.0372 29.3895 38.9865 27.0112 38.9983C24.6328 39.0101 22.3457 38.0835 20.6463 36.4196L20.6418 36.4173L17.2722 33.0184L17.2677 33.0161V33.0161Z" fill="black"/>
<path d="M17.1999 26.509C17.3039 26.401 17.4284 26.3148 17.5661 26.2554C17.7038 26.1961 17.8519 26.1647 18.0018 26.1632C18.1518 26.1617 18.3005 26.1901 18.4393 26.2467C18.5782 26.3032 18.7044 26.3869 18.8106 26.4928C18.9167 26.5986 19.0007 26.7246 19.0577 26.8633C19.1147 27.002 19.1435 27.1506 19.1424 27.3006C19.1413 27.4505 19.1104 27.5987 19.0514 27.7366C18.9924 27.8744 18.9066 27.9991 18.7989 28.1034C18.694 28.2084 18.5695 28.2917 18.4325 28.3486C18.2955 28.4055 18.1486 28.4348 18.0002 28.4349C17.7005 28.4351 17.4131 28.3163 17.201 28.1046C16.989 27.8928 16.8698 27.6055 16.8696 27.3059C16.8693 27.0062 16.9882 26.7188 17.1999 26.5067L17.1999 26.509ZM14.0065 23.3133C14.1107 23.2055 14.2353 23.1194 14.373 23.0603C14.5108 23.0011 14.659 22.9699 14.8089 22.9686C14.9588 22.9673 15.1075 22.9959 15.2463 23.0527C15.3851 23.1095 15.5112 23.1933 15.6172 23.2993C15.7232 23.4054 15.8071 23.5314 15.8639 23.6702C15.9206 23.809 15.9492 23.9577 15.9479 24.1076C15.9466 24.2575 15.9154 24.4057 15.8563 24.5435C15.7971 24.6813 15.7111 24.8059 15.6032 24.91C15.3902 25.1157 15.105 25.2295 14.8089 25.227C14.5128 25.2244 14.2296 25.1056 14.0203 24.8963C13.8109 24.6869 13.6921 24.4037 13.6896 24.1076C13.687 23.8115 13.8008 23.5263 14.0065 23.3133ZM10.8131 20.1176C10.9181 20.0128 11.0427 19.9297 11.1798 19.873C11.3169 19.8163 11.4639 19.7872 11.6122 19.7873C11.7606 19.7874 11.9075 19.8167 12.0445 19.8736C12.1816 19.9305 12.3061 20.0138 12.4109 20.1188C12.5158 20.2238 12.5989 20.3484 12.6556 20.4855C12.7123 20.6226 12.7414 20.7696 12.7413 20.9179C12.7412 21.0663 12.7118 21.2132 12.655 21.3502C12.5981 21.4873 12.5148 21.6118 12.4098 21.7166C12.1968 21.9223 11.9116 22.0361 11.6155 22.0336C11.3194 22.031 11.0362 21.9122 10.8268 21.7029C10.6175 21.4935 10.4987 21.2103 10.4961 20.9142C10.4936 20.6181 10.6074 20.3329 10.8131 20.1199L10.8131 20.1176ZM23.589 20.1176C23.694 20.0128 23.8186 19.9297 23.9557 19.873C24.0928 19.8163 24.2398 19.7872 24.3882 19.7873C24.5365 19.7874 24.6834 19.8167 24.8205 19.8736C24.9575 19.9305 25.082 20.0138 25.1868 20.1188C25.2917 20.2238 25.3748 20.3484 25.4315 20.4855C25.4882 20.6226 25.5173 20.7696 25.5172 20.9179C25.5171 21.0663 25.4878 21.2132 25.4309 21.3502C25.374 21.4873 25.2907 21.6118 25.1857 21.7166C24.9727 21.9223 24.6875 22.0361 24.3914 22.0336C24.0953 22.031 23.8121 21.9122 23.6028 21.7029C23.3934 21.4935 23.2746 21.2103 23.2721 20.9142C23.2695 20.6181 23.3833 20.3329 23.589 20.1199L23.589 20.1176ZM20.3933 16.9265C20.6051 16.7145 20.8924 16.5952 21.192 16.595C21.4917 16.5948 21.7791 16.7136 21.9912 16.9254C22.2032 17.1371 22.3224 17.4244 22.3227 17.724C22.3229 18.0237 22.204 18.3112 21.9923 18.5232C21.7793 18.7289 21.4941 18.8427 21.198 18.8401C20.9019 18.8376 20.6187 18.7188 20.4093 18.5094C20.2 18.3001 20.0812 18.0169 20.0786 17.7208C20.0761 17.4247 20.1899 17.1395 20.3956 16.9265L20.3933 16.9265ZM17.1999 13.7331C17.3039 13.6251 17.4284 13.5389 17.5661 13.4795C17.7038 13.4202 17.8519 13.3888 18.0018 13.3873C18.1518 13.3858 18.3005 13.4141 18.4393 13.4707C18.5782 13.5273 18.7044 13.611 18.8106 13.7168C18.9167 13.8227 19.0007 13.9487 19.0577 14.0874C19.1147 14.226 19.1435 14.3747 19.1424 14.5246C19.1413 14.6746 19.1104 14.8228 19.0514 14.9606C18.9924 15.0985 18.9066 15.2232 18.7989 15.3275C18.694 15.4325 18.5695 15.5158 18.4325 15.5727C18.2955 15.6296 18.1486 15.6589 18.0002 15.659C17.7005 15.6592 17.4131 15.5404 17.201 15.3287C16.989 15.1169 16.8698 14.8296 16.8696 14.53C16.8693 14.2303 16.9882 13.9428 17.1999 13.7308L17.1999 13.7331ZM20.3933 23.3133C20.4982 23.2083 20.6227 23.125 20.7597 23.0681C20.8967 23.0113 21.0436 22.9819 21.192 22.9818C21.3404 22.9817 21.4873 23.0109 21.6244 23.0675C21.7616 23.1242 21.8862 23.2074 21.9912 23.3122C22.0962 23.417 22.1795 23.5415 22.2363 23.6786C22.2932 23.8156 22.3226 23.9625 22.3227 24.1109C22.3228 24.2593 22.2936 24.4062 22.237 24.5433C22.1803 24.6804 22.0971 24.805 21.9923 24.91C21.7793 25.1157 21.4941 25.2295 21.198 25.227C20.9019 25.2244 20.6187 25.1056 20.4093 24.8963C20.2 24.6869 20.0812 24.4037 20.0786 24.1076C20.0761 23.8115 20.1899 23.5263 20.3956 23.3133L20.3933 23.3133ZM17.1999 20.1176C17.3049 20.0127 17.4295 19.9294 17.5667 19.8726C17.7039 19.8157 17.8509 19.7865 17.9994 19.7865C18.1479 19.7865 18.2949 19.8157 18.4321 19.8726C18.5692 19.9294 18.6939 20.0127 18.7989 20.1176C18.9039 20.2226 18.9872 20.3473 19.044 20.4845C19.1008 20.6216 19.13 20.7687 19.13 20.9171C19.13 21.0656 19.1008 21.2126 19.044 21.3498C18.9872 21.487 18.9039 21.6116 18.7989 21.7166C18.694 21.8216 18.5695 21.9049 18.4325 21.9618C18.2955 22.0187 18.1486 22.048 18.0002 22.0481C17.7005 22.0483 17.4131 21.9295 17.201 21.7177C16.989 21.506 16.8698 21.2187 16.8696 20.9191C16.8693 20.6194 16.9882 20.3319 17.1999 20.1199L17.1999 20.1176ZM14.0065 16.9265C14.1107 16.8186 14.2353 16.7326 14.373 16.6734C14.5108 16.6142 14.659 16.5831 14.8089 16.5818C14.9588 16.5805 15.1075 16.6091 15.2463 16.6658C15.3851 16.7226 15.5112 16.8065 15.6172 16.9125C15.7232 17.0185 15.8071 17.1446 15.8639 17.2834C15.9206 17.4221 15.9492 17.5708 15.9479 17.7208C15.9466 17.8707 15.9154 18.0189 15.8563 18.1567C15.7971 18.2944 15.7111 18.419 15.6032 18.5232C15.3902 18.7289 15.105 18.8427 14.8089 18.8401C14.5128 18.8376 14.2296 18.7188 14.0202 18.5094C13.8109 18.3001 13.6921 18.0169 13.6896 17.7208C13.687 17.4247 13.8008 17.1395 14.0065 16.9265Z" fill="black"/>
<path d="M48.896 36V11.328H52.592C53.392 11.328 53.904 11.696 54.128 12.432L54.512 14.256C55.376 13.328 56.336 12.544 57.392 11.904C58.448 11.264 59.696 10.944 61.136 10.944C62.704 10.944 63.984 11.376 64.976 12.24C65.968 13.072 66.704 14.176 67.184 15.552C67.952 13.952 69.056 12.784 70.496 12.048C71.936 11.312 73.472 10.944 75.104 10.944C77.856 10.944 79.952 11.776 81.392 13.44C82.864 15.104 83.6 17.392 83.6 20.304V36H77.552V20.304C77.552 18.768 77.216 17.6 76.544 16.8C75.872 16 74.864 15.6 73.52 15.6C72.336 15.6 71.328 16.016 70.496 16.848C69.696 17.68 69.296 18.832 69.296 20.304V36H63.2V20.304C63.2 18.672 62.864 17.488 62.192 16.752C61.552 15.984 60.608 15.6 59.36 15.6C58.496 15.6 57.696 15.824 56.96 16.272C56.256 16.688 55.584 17.248 54.944 17.952V36H48.896ZM45.296 36V33.216C45.296 32.768 45.408 32.432 45.632 32.208C45.888 31.984 46.24 31.824 46.688 31.728L49.424 31.152L50.048 36H45.296ZM53.792 36L54.416 31.152L57.152 31.728C57.6 31.824 57.936 31.984 58.16 32.208C58.416 32.432 58.544 32.768 58.544 33.216V36H53.792ZM68.144 36L68.72 31.152L71.504 31.728C71.92 31.824 72.256 31.984 72.512 32.208C72.768 32.432 72.896 32.768 72.896 33.216V36H68.144ZM50.048 11.328L49.424 16.176L46.688 15.6C46.24 15.504 45.888 15.344 45.632 15.12C45.408 14.896 45.296 14.56 45.296 14.112V11.328H50.048ZM82.448 36L83.072 31.152L85.808 31.728C86.256 31.824 86.592 31.984 86.816 32.208C87.072 32.432 87.2 32.768 87.2 33.216V36H82.448ZM99.9676 36.384C97.5036 36.384 95.3596 35.84 93.5356 34.752C91.7116 33.632 90.2876 32.08 89.2636 30.096C88.2716 28.08 87.7756 25.76 87.7756 23.136C87.7756 20.832 88.2716 18.768 89.2636 16.944C90.2556 15.088 91.6476 13.632 93.4396 12.576C95.2316 11.488 97.3116 10.944 99.6796 10.944C101.824 10.944 103.696 11.408 105.296 12.336C106.928 13.232 108.176 14.512 109.04 16.176C109.936 17.84 110.384 19.824 110.384 22.128C110.384 22.992 110.304 23.6 110.144 23.952C109.984 24.272 109.6 24.432 108.992 24.432H93.8716C93.8716 24.528 93.8716 24.624 93.8716 24.72C93.8716 24.816 93.8876 24.912 93.9196 25.008C94.1756 27.248 94.8636 28.928 95.9836 30.048C97.1356 31.168 98.6396 31.728 100.496 31.728C101.36 31.728 102.224 31.552 103.088 31.2C103.984 30.848 104.8 30.496 105.536 30.144C106.272 29.76 106.864 29.568 107.312 29.568C107.76 29.568 108.128 29.744 108.416 30.096L110.192 32.304C109.328 33.296 108.32 34.096 107.168 34.704C106.048 35.312 104.864 35.744 103.616 36C102.4 36.256 101.184 36.384 99.9676 36.384ZM93.9676 20.832H104.96C104.96 19.232 104.528 17.904 103.664 16.848C102.8 15.792 101.52 15.264 99.8236 15.264C98.1276 15.264 96.7836 15.744 95.7916 16.704C94.8316 17.664 94.2236 19.04 93.9676 20.832ZM120.534 36.384C118.646 36.384 117.014 35.856 115.638 34.8C114.294 33.712 113.254 32.224 112.518 30.336C111.782 28.448 111.414 26.256 111.414 23.76C111.414 21.328 111.846 19.152 112.71 17.232C113.574 15.312 114.806 13.776 116.406 12.624C118.006 11.472 119.878 10.896 122.022 10.896C123.398 10.896 124.566 11.12 125.526 11.568C126.486 11.984 127.35 12.56 128.118 13.296V0.287999H134.214V36H130.47C129.67 36 129.158 35.632 128.934 34.896L128.454 32.544C127.462 33.696 126.31 34.624 124.998 35.328C123.686 36.032 122.198 36.384 120.534 36.384ZM122.598 31.632C123.814 31.632 124.854 31.376 125.718 30.864C126.582 30.352 127.382 29.632 128.118 28.704V17.616C127.446 16.816 126.726 16.256 125.958 15.936C125.19 15.616 124.358 15.456 123.462 15.456C122.214 15.456 121.158 15.776 120.294 16.416C119.462 17.056 118.822 18 118.374 19.248C117.926 20.464 117.702 21.968 117.702 23.76C117.702 26.32 118.102 28.272 118.902 29.616C119.702 30.96 120.934 31.632 122.598 31.632ZM129.318 0.287999L128.694 5.136L125.91 4.56C125.494 4.464 125.158 4.304 124.902 4.08C124.646 3.856 124.518 3.52 124.518 3.072V0.287999H129.318ZM133.014 36L133.638 31.152L136.422 31.728C136.838 31.824 137.174 31.984 137.43 32.208C137.686 32.432 137.814 32.768 137.814 33.216V36H133.014ZM142.17 36V11.328H148.218V36H142.17ZM138.57 36V33.216C138.57 32.768 138.682 32.432 138.906 32.208C139.162 31.984 139.514 31.824 139.962 31.728L142.698 31.152L143.322 36H138.57ZM147.066 36L147.69 31.152L150.426 31.728C150.874 31.824 151.21 31.984 151.434 32.208C151.69 32.432 151.818 32.768 151.818 33.216V36H147.066ZM143.322 11.328L142.698 16.176L139.962 15.6C139.514 15.504 139.162 15.344 138.906 15.12C138.682 14.896 138.57 14.56 138.57 14.112V11.328H143.322ZM145.29 7.92C144.266 7.92 143.37 7.552 142.602 6.816C141.834 6.08 141.45 5.2 141.45 4.176C141.45 3.12 141.834 2.224 142.602 1.488C143.37 0.719998 144.266 0.335999 145.29 0.335999C146.346 0.335999 147.258 0.719998 148.026 1.488C148.794 2.224 149.178 3.12 149.178 4.176C149.178 5.2 148.794 6.08 148.026 6.816C147.258 7.552 146.346 7.92 145.29 7.92ZM169.065 44.064L169.113 32.88C168.153 33.904 167.049 34.736 165.801 35.376C164.553 35.984 163.129 36.288 161.529 36.288C159.609 36.288 157.961 35.76 156.585 34.704C155.241 33.648 154.201 32.192 153.465 30.336C152.761 28.448 152.409 26.304 152.409 23.904C152.409 21.376 152.825 19.136 153.657 17.184C154.521 15.232 155.881 13.696 157.737 12.576C159.625 11.424 162.073 10.848 165.081 10.848C166.073 10.848 167.145 10.88 168.297 10.944C169.449 11.008 170.617 11.136 171.801 11.328C172.985 11.52 174.105 11.792 175.161 12.144V44.064H169.065ZM163.593 31.632C164.841 31.632 165.881 31.392 166.713 30.912C167.545 30.4 168.345 29.664 169.113 28.704V15.984C168.185 15.728 167.401 15.568 166.761 15.504C166.121 15.408 165.417 15.36 164.649 15.36C163.337 15.36 162.233 15.68 161.337 16.32C160.441 16.96 159.769 17.904 159.321 19.152C158.905 20.4 158.697 21.952 158.697 23.808C158.697 26.368 159.097 28.32 159.897 29.664C160.697 30.976 161.929 31.632 163.593 31.632ZM165.273 44.064V41.28C165.273 40.832 165.401 40.496 165.657 40.272C165.913 40.048 166.249 39.888 166.665 39.792L169.449 39.216L170.025 44.064H165.273ZM173.769 44.064L174.393 39.216L177.129 39.792C177.577 39.888 177.913 40.048 178.137 40.272C178.393 40.496 178.521 40.832 178.521 41.28V44.064H173.769ZM180.102 23.952V18.96H192.582V23.952H180.102ZM198.178 36V11.328H204.226V36H198.178ZM194.578 36V33.216C194.578 32.768 194.69 32.432 194.914 32.208C195.17 31.984 195.522 31.824 195.97 31.728L198.706 31.152L199.33 36H194.578ZM203.074 36L203.698 31.152L206.434 31.728C206.882 31.824 207.218 31.984 207.442 32.208C207.698 32.432 207.826 32.768 207.826 33.216V36H203.074ZM199.33 11.328L198.706 16.176L195.97 15.6C195.522 15.504 195.17 15.344 194.914 15.12C194.69 14.896 194.578 14.56 194.578 14.112V11.328H199.33ZM201.298 7.92C200.274 7.92 199.378 7.552 198.61 6.816C197.842 6.08 197.458 5.2 197.458 4.176C197.458 3.12 197.842 2.224 198.61 1.488C199.378 0.719998 200.274 0.335999 201.298 0.335999C202.354 0.335999 203.266 0.719998 204.034 1.488C204.802 2.224 205.186 3.12 205.186 4.176C205.186 5.2 204.802 6.08 204.034 6.816C203.266 7.552 202.354 7.92 201.298 7.92Z" fill="black"/>
</svg>
</div>
            <div class="prescription-title">Medical Prescription</div>
            <div class="date">${format(
              new Date(prescription.created_at),
              "MMMM dd, yyyy"
            )}</div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Medication Details</div>
              <div class="detail-row">
                <span class="detail-label">Medication:</span>
                <span class="detail-value">${prescription.medication}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Dosage:</span>
                <span class="detail-value">${prescription.dosage}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Frequency:</span>
                <span class="detail-value">${prescription.frequency}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">${prescription.duration}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Healthcare Provider</div>
              <div class="detail-row">
                <span class="detail-label">Prescribed by:</span>
                <span class="detail-value">${
                  prescription.service_provider
                }</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${format(
                  new Date(prescription.created_at),
                  "MMMM dd, yyyy 'at' h:mm a"
                )}</span>
              </div>
            </div>
            
            ${
              prescription.notes
                ? `
            <div class="notes">
              <div class="notes-title">Special Instructions:</div>
              <div>${prescription.notes}</div>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="stamp">
            <div class="stamp-text">
              OFFICIALLY<br>
              PRESCRIBED<br>
              ${format(new Date(prescription.created_at), "MMM dd, yyyy")}
            </div>
          </div>
          
          <div class="footer">
            <p>This prescription was generated by Mediqi Healthcare Platform</p>
            <p>For questions, please contact your healthcare provider</p>
          </div>
          
          <script>
            // Auto-trigger print dialog when page loads
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
  };

  const getStatusBadge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays <= 7) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Recent
        </Badge>
      );
    } else if (diffInDays <= 30) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Active
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Archived
        </Badge>
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading prescriptions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="p-3 bg-red-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Pill className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error loading prescriptions
              </h3>
              <p className="text-gray-600 mb-4">
                Unable to load your prescriptions. Please try again later.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              My Prescriptions
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            View and manage all your prescribed medications
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search medications, doctors, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-11 sm:h-12 px-3 sm:px-4 text-sm"
              >
                <Filter className="w-4 h-4 mr-1.5 sm:mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Prescriptions Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrescriptions.map((prescription) => (
            <Card
              key={prescription.id}
              className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm"
            >
              <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                      <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {prescription.medication}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {prescription.dosage}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {getStatusBadge(prescription.created_at)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                {/* Prescription Details */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium truncate">
                      {prescription.frequency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{prescription.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Prescribed by:</span>
                    <span className="font-medium truncate">
                      {prescription.service_provider}
                    </span>
                  </div>

                  {prescription.notes && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-gray-600">Notes:</span>
                        <p className="font-medium text-gray-900 mt-1 break-words">
                          {prescription.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prescription Date */}
                <div className="pt-2 sm:pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Prescribed on{" "}
                    {format(new Date(prescription.created_at), "MMM dd, yyyy")}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8 sm:h-9"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[95vw] sm:w-auto mx-4">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Pill className="w-5 h-5 text-blue-600" />
                          {prescription.medication}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Dosage:</span>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <p className="font-medium">
                              {prescription.duration}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Frequency:</span>
                            <p className="font-medium">
                              {prescription.frequency}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Prescribed by:
                            </span>
                            <p className="font-medium">
                              {prescription.service_provider}
                            </p>
                          </div>
                        </div>
                        {prescription.notes && (
                          <div>
                            <span className="text-gray-600 text-sm">
                              Notes:
                            </span>
                            <p className="font-medium mt-1">
                              {prescription.notes}
                            </p>
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Prescribed on{" "}
                          {format(
                            new Date(prescription.created_at),
                            "MMM dd, yyyy 'at' h:mm a"
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-8 sm:h-9"
                    onClick={() => generatePDF(prescription)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Generate PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="p-3 sm:p-4 bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              No prescriptions found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "You don't have any prescriptions yet"}
            </p>
            {!searchTerm && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Get Your First Prescription
              </Button>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {filteredPrescriptions.length > 0 && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-green-50 rounded-lg">
                    <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Active Prescriptions
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">
                      {
                        filteredPrescriptions.filter((p) => {
                          const days = Math.floor(
                            (new Date().getTime() -
                              new Date(p.created_at).getTime()) /
                              (1000 * 60 * 60 * 24)
                          );
                          return days <= 30;
                        }).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Total Prescriptions
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">
                      {filteredPrescriptions.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-purple-50 rounded-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Healthcare Providers
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">
                      {
                        new Set(
                          filteredPrescriptions.map((p) => p.service_provider)
                        ).size
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
