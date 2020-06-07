let sample = {
    number_id: '1911190064',
    name_id: 'komaID',
    start_date: '2019-11-20',
    start_date_show_results: '2019-11-20',
    end_date_show_results: '2025-12-31',
    purchase_fee: 0,
    selling_fee: 0,
    purchase_price: 20000,
    selling_price: 15000,
    charge_collect_mining: 0.055,
    minimum_collect_mining: 10,
    minimum_mining_held: 0.001,
    top_up: [
        {
            date: '2019-11-22',
            nominal: 10000000,
            information: 'Batal investasi dari pengguna EDCCASH lain'
        },
        {
            date: '2019-12-25',
            nominal: 2000000,
            information: 'Mamak'
        },
        {
            date: '2020-01-21',
            nominal: 2000000,
            information: 'Bibik'
        },
        {
            date: '2020-04-23',
            nominal: 5000000,
            information: ''
        },
        {
            date: '2020-05-17',
            nominal: 3100000,
            information: ''
        },
        {
            date: '2020-05-27',
            nominal: 2040000,
            information: ''
        },
        {
            date: '2020-06-07',
            nominal: 4000000,
            information: ''
        },
        // {
        //     date: '2020-07-15',
        //     nominal: 2000000,
        //     information: ''
        // },
        // {
        //     date: '2020-08-15',
        //     nominal: 2000000,
        //     information: ''
        // },
        // {
        //     date: '2020-09-15',
        //     nominal: 2000000,
        //     information: ''
        // },
        // {
        //     date: '2020-10-15',
        //     nominal: 2000000,
        //     information: ''
        // }
    ],
    withdrawals: [
        {
            date: '2020-03-13',
            nominal: 2200000,
            information: 'Ani'
        },
        {
            date: '2022-10-10',
            nominal: 600000000,
            infomation: 'Mazda CX-5 Elite'
        }
    ],
    withdrawals_periodic: [
        {
            start: '2022-01-01',
            periods_withdrawal: 'monthly',
            nominal_withdrawal: 15000000,
            nominal_increase: 2,
            nominal_increase_type: 'multipication',
            periods_nominal_increase: 12,
            periods_end: null
        },
        {
            start: '2022-12-15',
            periods_withdrawal: 'yearly',
            nominal_withdrawal: 100000000,
            nominal_increase: 150000000,
            nominal_increase_type: 'addition',
            periods_nominal_increase: 1,
            periods_end: null
        },
        {
            start: '2021-01-15',
            periods_withdrawal: 'monthly',
            nominal_withdrawal: 3000000,
            nominal_increase: 0,
            nominal_increase_type: 'addition',
            periods_nominal_increase: 12,
            periods_end: '2022-01-01'
        }
    ],
    fee_renewal: [
        {
            date: '2020-01-21',
            fee_for: 'selling',
            percentage: 0.3
        },
        {
            date: '2020-01-21',
            fee_for: 'purchase',
            percentage: 0.4
        },
        {
            date: '2020-04-23',
            fee_for: 'purchase',
            percentage: 0.3
        }
    ],
    price_renewal: [],
    charge_collect_mining_renewal: [
        {
            date: '2019-12-25',
            value: 0.005
        },
        {
            date: '2020-01-22',
            value: 0.055
        }
    ],
    minimum_collect_mining_renewal: [
        {
            date: '2019-12-26',
            value: 1
        },
        {
            date: '2020-02-17',
            value: 10
        }
    ],
    minimum_mining_held_renewal: [
        {
            date: '2019-12-25',
            value: 0.05
        },
        {
            date: '2019-12-26',
            value: 0.005
        },
        {
            date: '2019-12-27',
            value: 0.001
        }
    ],
    missed_collect_mining: ['2020-02-15', '2020-04-04', '2020-05-03', '2020-06-06'],
    mistaken_collect_mining: [
        {
            date: '2019-12-26',
            collected: 3.495
        },
        {
            date: '2019-12-26',
            collected: 0.04
        },
        {
            date: '2020-01-11',
            collected: 3.459
        },
        {
            date: '2020-06-05',
            collected: 14.427
        }
    ]
}