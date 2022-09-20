import axios from "axios"
import { useState } from "react";
import { TemplateGroup } from "../models/template-groups.model";

export const getTemplateGroups = () => {
  console.log('get template groups')
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TemplateGroup[]>([])
  const [error, setError] = useState<string>('');
  const load = () => {
    if (loading) {
      return
    }
    setLoading(true);
    axios.get<TemplateGroup[]>('https://api.mars.cards/api/template-groups')
      .then(data => setData(data.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }
  return {
    loading, data, error, load
  }
}