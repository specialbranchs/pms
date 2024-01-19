import { useEffect, useState } from 'react';
import { finalize } from 'rxjs/operators';
import { doOnSubscribe } from '../utils/rxjs.utils';
import { DesignationType } from '../../typings/structures';
import api from '../api';



const useDesignation = () => {
  const [designations, setDesignations] = useState<Array<DesignationType>>([
    {
      id: 0,
      dig_name: 'select designation' 
    }
  ]);
  const [designationLoading, setDesignationLoading] = useState(false);

  useEffect(() => {
   
      api.common
        .getPmsDesignationList()
        .pipe(
          doOnSubscribe(() => setDesignationLoading(true)),
          finalize(() => setDesignationLoading(false))
        )
        .subscribe({
          next: (designationData) => {
            setDesignations([
              {
                id: 0,
                dig_name: 'select designation' 
              },
              ...designationData
            ]);
          },
          error: (error) => console.log(error)
        });
  }, [setDesignations]);

  return {
    designationLoading,
    designations
  };
};

export default useDesignation;