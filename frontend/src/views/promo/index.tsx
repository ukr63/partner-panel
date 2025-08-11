'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PromoList from "@/views/promo/comps/PromoList";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import StatisticsModel from "@/models/statistics";
import {notifyError, notifySuccess} from "@/lib/notifications";

const Promo = () => {

    const [list, setList] = useState<any>([]);

    const fetchData = async () => {
        const response: any = await StatisticsModel.getAllPromos();
        setList(response?.data?.items);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div  style={{height: '80vh', width: '100%'}}>
            <AddPromo mutate={fetchData} />
            <PromoList rows={list}/>
        </div>
    )
};

const AddPromo = (props: any) => {
    const {
        mutate
    } = props;

    const [open, setOpen2] = useState(false);
    const [data, setData] = useState<any>([]);

    const setOpen = (value: boolean) => {
        setOpen2(value);
        setData({});
    }

    const _setData = (field: any, value: any) => {
        setData((v: any) => {
            return {
                ...v,
                [field]: value
            }
        })
    }

    const addPromo = async () => {

        try {
            const response: any = await StatisticsModel.addPromo(data?.name);
            notifySuccess(response?.data?.message);
            mutate && mutate();
        } catch (e: any) {
            notifyError('Happends error during adding promo.');
        }
        setOpen(false);
        setData({});
    }

    return (
        <div>
            <div className={'button-add-promo'}>
                <Button variant={'outlined'} onClick={() => setOpen(!open)}>Add Promo <AddIcon/></Button>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Promo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <TextField
                                id="outlined-controlled"
                                label="Promo Name"
                                value={data?.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    _setData('name', event.target.value);
                                }}
                            />
                        </div>
                        <div className={'buttons-grid'}>
                            <Button variant="outlined" onClick={() => setOpen(false)}>Close</Button>
                            <Button variant="contained" onClick={addPromo}>Add Promo</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <style jsx>{`
                .buttons-grid {
                    display: flex;
                    width: 100%;
                    margin-top: 20px;
                    flex-direction: row;
                    justify-content: space-between;
                    
                    > div {
                        
                    }
                }
                
                .button-add-promo {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    )
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Promo;