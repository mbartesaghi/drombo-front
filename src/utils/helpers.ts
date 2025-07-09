import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("DD/MM/yyyy")
}

export const getRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export const toUpperCase = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export const getTransferStatusText = (status: string | undefined) => {
  return status ? toUpperCase(status) : "N/A"
}

const sizeDescriptions: Record<string, string> = {
	SMALL: "20x20x10 cm",
	MEDIUM: "35x25x10 cm",
	BIG: "50x30x10 cm",
};

export const getCompartmentSize = (compartment: string) => {
  return sizeDescriptions[compartment]
}

export const getCompartmentText = (compartmentType: string) => {
	switch (compartmentType) {
		case "SMALL":
			return "Chico"
		case "MEDIUM":
			return "Mediano"
		case "BIG":
			return "Grande"
		default:
			return "N/A"
	}
}

export const getTransferTypeText = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export const getTransferUrgencyText = (urgency: string) => {
  return urgency.charAt(0).toUpperCase() + urgency.slice(1)
}

export const getStatusTagStyle = (state: string | undefined) => {
  switch (state) {
	case "pendiente":
	  return "bg-yellow-100 text-yellow-800 ring-yellow-400/30";
	case "confirmado":
	  return "bg-blue-100 text-blue-800 ring-blue-400/30";
	case "entregado":
	  return "bg-green-100 text-green-800 ring-green-400/30";
	case "rechazado":
	  return "bg-red-100 text-red-800 ring-red-400/30";
	default:
	  return "";
  }
};
 