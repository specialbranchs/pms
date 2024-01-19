import { useEffect, useState } from 'react';
import { finalize } from 'rxjs/operators';
import { doOnSubscribe } from '../utils/rxjs.utils';
import { Designation, Zone } from '../../typings/structures';
import api from '../api';



const useZoneList = () => {
  const [zoneLists, setZones] = useState<Array<Zone>>([
    {
      id: 0,
      zone: 'select Location' 
    }
  ]);
  const [zoneLoading, setZoneLoading] = useState(false);

  useEffect(() => {
   
      api.common
        .getPmsZoneList()
        .pipe(
          doOnSubscribe(() => setZoneLoading(true)),
          finalize(() => setZoneLoading(false))
        )
        .subscribe({
          next: (designationData) => {
            setZones([
              {
                id: 0,
                zone: 'select Location' 
              },
              ...designationData
            ]);
          },
          error: (error) => console.log(error)
        });
  }, [setZones]);

  return {
    zoneLoading,
    zoneLists
  };
};

export default useZoneList;