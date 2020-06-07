function Currency(val) {
  val = val.toFixed(0)
  val = val.toString()
  var mod = val.length % 3,
    currency = val.substr(0, mod),
    thousand = val.substr(mod).match(/\d{3}/g),
    separator = ''
  if (thousand) {
    separator = mod ? ',' : ''
    currency += separator + thousand.join(',')
  }
  return 'Rp' + currency
}

function mask(val) {
  val = typeof val === 'number' ? val.toString() : val
  val = val.split('.')
  let end = val[1] ? '.' + val[1] : ''
  val = val[0]
  var mod = val.length % 3,
    mask = val.substr(0, mod),
    thousand = val.substr(mod).match(/\d{3}/g),
    separator = ''
  if (thousand) {
    separator = mod ? ',' : ''
    mask += separator + thousand.join(',')
  }
  return mask + end
}

function date_formatted(date, plain = false) {
  let tanggal = date.getDate()
  tanggal = tanggal.toString().length < 2 ? `0${tanggal}` : tanggal
  let bulan = date.getMonth()
  let tahun = date.getFullYear()
  let DATE = new Date()
  DATE = new Date(`${DATE.getFullYear()}-${DATE.getMonth() + 1}-${DATE.getDate()}`)
  switch (bulan) {
    case 0:
      bulan = 'Jan'
      break
    case 1:
      bulan = 'Feb'
      break
    case 2:
      bulan = 'Mar'
      break
    case 3:
      bulan = 'Apr'
      break
    case 4:
      bulan = 'Mei'
      break
    case 5:
      bulan = 'Jun'
      break
    case 6:
      bulan = 'Jul'
      break
    case 7:
      bulan = 'Agu'
      break
    case 8:
      bulan = 'Sep'
      break
    case 9:
      bulan = 'Okt'
      break
    case 10:
      bulan = 'Nov'
      break
    case 11:
      bulan = 'Des'
      break
  }
  let diff = Math.round(Math.round((date.getTime() - DATE.getTime()) / (24 * 60 * 60 * 1000)))
  switch (diff) {
    case -1:
      return `Kemarin - ${tanggal} ${bulan} ${tahun}`
    case 0:
      return `Hari ini - ${tanggal} ${bulan} ${tahun}`
    case 1:
      return `Besok - ${tanggal} ${bulan} ${tahun}`
    case 2:
      return `Lusa - ${tanggal} ${bulan} ${tahun}`
    case 3:
      return `Tulat - ${tanggal} ${bulan} ${tahun}`
    case 4:
      return `Tubin - ${tanggal} ${bulan} ${tahun}`
    default:
      return `${tanggal} ${bulan} ${tahun}`
  }
}

function simulated(sample) {
  let results = []
  const start_date = new Date(sample.start_date)
  const end_date = new Date(sample.end_date_show_results)
  const start_date_show_results = new Date(sample.start_date_show_results)
  const start_show_results_index = Math.round(Math.round((start_date_show_results.getTime() - start_date.getTime()) / (24 * 60 * 60 * 1000)))
  const range = Math.round(Math.round((end_date.getTime() - start_date.getTime()) / (24 * 60 * 60 * 1000)))
  let purchase_price = sample.purchase_price
  let selling_price = sample.selling_price
  let purchase_fee = sample.purchase_fee
  let selling_fee = sample.selling_fee
  let saldo = parseFloat((4000000 / purchase_price).toFixed(3))
  let mining = 0
  let ripening_records = []
  let mining_increase_index = []
  let minimum_collect_mining = sample.minimum_collect_mining
  let charge_collect_mining = sample.charge_collect_mining
  let minimum_mining_held = sample.minimum_mining_held
  let missed_collect_mining = sample.missed_collect_mining.map(a => {
    return new Date(a).getTime()
  })
  let withdrawals = 0
  let monthly_withdrawal = sample.withdrawals_periodic.filter(a => {
    return a.periods_withdrawal === 'monthly'
  }).map(a => {
    return {
      date: a.start,
      nominal: a.nominal_withdrawal,
      increase_type: a.nominal_increase_type,
      increase: a.nominal_increase,
      periods: a.periods_nominal_increase,
      periods_add: 0,
      end: a.periods_end
    }
  })
  let yearly_withdrawal = sample.withdrawals_periodic.filter(a => {
    return a.periods_withdrawal === 'yearly'
  }).map(a => {
    return {
      date: a.start,
      nominal: a.nominal_withdrawal,
      increase_type: a.nominal_increase_type,
      increase: a.nominal_increase,
      periods: a.periods_nominal_increase,
      periods_add: 0,
      end: a.periods_end
    }
  })
  for (let i = 1; i <= range; i++) {
    let progress = {}
    progress.data = []
    let current_date = new Date(start_date.getTime() + (i * 24 * 60 * 60 * 1000))

    ripening_records.push(parseFloat((saldo * (.5 / 100)).toFixed(3)))
    mining_increase_index.push(i + 30)

    if (mining_increase_index.indexOf(i) > -1) {
      mining += ripening_records[mining_increase_index.indexOf(i)]
      progress.data.push({
        type: 'MINING_INCREASE',
        edccash: ripening_records[mining_increase_index.indexOf(i)],
        mining_total: mining
      })
      ripening_records[mining_increase_index.indexOf(i)] = 0
      progress.data.push({
        type: 'RIPENING_TOTAL',
        edccash: parseFloat(ripening_records.reduce((total, num) => {
          return total + num
        }).toFixed(3))
      })
    }

    let minimum_collect_mining_renewal_index = sample.minimum_collect_mining_renewal.map(a => { return new Date(a.date).getTime() }).indexOf(current_date.getTime())
    if (minimum_collect_mining_renewal_index > -1) {
      minimum_collect_mining = sample.minimum_collect_mining_renewal[minimum_collect_mining_renewal_index].value
    }

    let minimum_mining_held_renewal_index = sample.minimum_mining_held_renewal.map(a => { return new Date(a.date).getTime() }).indexOf(current_date.getTime())
    if (minimum_mining_held_renewal_index > -1) {
      minimum_mining_held = sample.minimum_mining_held_renewal[minimum_mining_held_renewal_index].value
    }

    let charge_collect_mining_renewal_index = sample.charge_collect_mining_renewal.map(a => { return new Date(a.date).getTime() }).indexOf(current_date.getTime())
    if (charge_collect_mining_renewal_index > -1) {
      charge_collect_mining = sample.charge_collect_mining_renewal[charge_collect_mining_renewal_index].value
    }

    let fee_renewal_filtered = sample.fee_renewal.filter(a => { return new Date(a.date).getTime() === current_date.getTime() })
    if (fee_renewal_filtered.length > 0) {
      fee_renewal_filtered.map(a => {
        if (a.fee_for === 'purchase') {
          purchase_fee = a.percentage
        } else if (a.fee_for === 'selling') {
          selling_fee = a.percentage
        }
      })
    }

    let mistaken_collect_mining_filtered = sample.mistaken_collect_mining.filter(a => { return new Date(a.date).getTime() === current_date.getTime() })
    if (mistaken_collect_mining_filtered.length > 0) {
      mistaken_collect_mining_filtered.map(a => {
        let collect_mining = a.collected
        saldo = parseFloat((saldo + collect_mining).toFixed(3))
        let mining_total = mining.toFixed(3)
        mining = parseFloat((mining - collect_mining - charge_collect_mining).toFixed(3))
        progress.data.push({
          type: 'COLLECT_MINING',
          edccash: collect_mining,
          mining_total: mining_total
        })
      })
    }

    if (missed_collect_mining.indexOf(current_date.getTime()) < 0 && (mining - minimum_mining_held - charge_collect_mining) >= minimum_collect_mining) {
      let collect_mining = parseFloat((mining - minimum_mining_held - charge_collect_mining).toFixed(3))
      saldo = parseFloat((saldo + collect_mining).toFixed(3))
      let mining_total = mining.toFixed(3)
      mining = parseFloat((mining - collect_mining - charge_collect_mining).toFixed(3))
      progress.data.push({
        type: 'COLLECT_MINING',
        edccash: collect_mining,
        mining_total: mining_total
      })
    }

    let top_up_filtered = sample.top_up.filter(a => { return new Date(a.date).getTime() === current_date.getTime() })
    if (top_up_filtered.length > 0) {
      top_up_filtered.map(a => {
        let edccash = (a.nominal / purchase_price) - (purchase_fee / 100 * (a.nominal / purchase_price))
        saldo += parseFloat(edccash.toFixed(3))
        progress.data.push({
          type: 'TOP_UP',
          nominal: a.nominal,
          edccash: edccash,
          fee: purchase_fee
        })
      })
    }

    let withdrawals_filtered = sample.withdrawals.filter(a => { return new Date(a.date).getTime() === current_date.getTime() })
    if (withdrawals_filtered.length > 0) {
      withdrawals_filtered.map(a => {
        withdrawals += a.nominal
      })
    }

    let monthly_withdrawal_index = monthly_withdrawal.map(a => {
      return new Date(a.date).getTime()
    }).indexOf(current_date.getTime())
    if (monthly_withdrawal_index > -1) {
      withdrawals += monthly_withdrawal[monthly_withdrawal_index].nominal
      let monthly_withdrawal_date = new Date(monthly_withdrawal[monthly_withdrawal_index].date)
      let next_monthly_withdrawal_date = new Date(monthly_withdrawal_date.getFullYear(), monthly_withdrawal_date.getMonth() + 1, monthly_withdrawal_date.getDate())
      let next_monthly_withdrawal_date_y = next_monthly_withdrawal_date.getFullYear()
      let next_monthly_withdrawal_date_m = (next_monthly_withdrawal_date.getMonth() + 1).toString()
      let next_monthly_withdrawal_date_d = next_monthly_withdrawal_date.getDate().toString()
      next_monthly_withdrawal_date_m = next_monthly_withdrawal_date_m.length < 2
        ? '0' + next_monthly_withdrawal_date_m
        : next_monthly_withdrawal_date_m
        next_monthly_withdrawal_date_d = next_monthly_withdrawal_date_d.length < 2
        ? '0' + next_monthly_withdrawal_date_d
        : next_monthly_withdrawal_date_d
      let monthly_periods_add = monthly_withdrawal[monthly_withdrawal_index].periods_add + 1
      let monthly_withdrawal_nominal = monthly_withdrawal[monthly_withdrawal_index].nominal
      let next_monthly = `${next_monthly_withdrawal_date_y}-${next_monthly_withdrawal_date_m}-${next_monthly_withdrawal_date_d}`
      if (monthly_withdrawal[monthly_withdrawal_index].end === null || new Date(next_monthly).getTime() <= new Date(monthly_withdrawal[monthly_withdrawal_index].end).getTime()) {
        if (monthly_periods_add >= monthly_withdrawal[monthly_withdrawal_index].periods) {
          switch (monthly_withdrawal[monthly_withdrawal_index].increase_type) {
            case 'multipication':
              monthly_withdrawal_nominal *= monthly_withdrawal[monthly_withdrawal_index].increase
              break
            case 'addition':
              monthly_withdrawal_nominal += monthly_withdrawal[monthly_withdrawal_index].increase
              break
          }
          monthly_periods_add = 0
        }
        monthly_withdrawal.push({
          date: next_monthly,
          nominal: monthly_withdrawal_nominal,
          increase_type: monthly_withdrawal[monthly_withdrawal_index].increase_type,
          increase: monthly_withdrawal[monthly_withdrawal_index].increase,
          periods: monthly_withdrawal[monthly_withdrawal_index].periods,
          periods_add: monthly_periods_add
        })
      }
    }

    let yearly_withdrawal_index = yearly_withdrawal.map(a => {
      return new Date(a.date).getTime()
    }).indexOf(current_date.getTime())
    if (yearly_withdrawal_index > -1) {
      withdrawals += yearly_withdrawal[yearly_withdrawal_index].nominal
      let yearly_withdrawal_date = new Date(yearly_withdrawal[yearly_withdrawal_index].date)
      let next_yearly_withdrawal_date = new Date(yearly_withdrawal_date.getFullYear() + 1, yearly_withdrawal_date.getMonth(), yearly_withdrawal_date.getDate())
      let next_yearly_withdrawal_date_y = next_yearly_withdrawal_date.getFullYear()
      let next_yearly_withdrawal_date_m = (next_yearly_withdrawal_date.getMonth() + 1).toString()
      let next_yearly_withdrawal_date_d = next_yearly_withdrawal_date.getDate().toString()
      next_yearly_withdrawal_date_m = next_yearly_withdrawal_date_m.length < 2
        ? '0' + next_yearly_withdrawal_date_m
        : next_yearly_withdrawal_date_m
        next_yearly_withdrawal_date_d = next_yearly_withdrawal_date_d.length < 2
        ? '0' + next_yearly_withdrawal_date_d
        : next_yearly_withdrawal_date_d
      let yearly_periods_add = yearly_withdrawal[yearly_withdrawal_index].periods_add + 1
      let yearly_withdrawal_nominal = yearly_withdrawal[yearly_withdrawal_index].nominal
      if (yearly_periods_add >= yearly_withdrawal[yearly_withdrawal_index].periods) {
        switch (yearly_withdrawal[yearly_withdrawal_index].increase_type) {
          case 'multipication':
            yearly_withdrawal_nominal *= yearly_withdrawal[yearly_withdrawal_index].increase
            break
          case 'addition':
            yearly_withdrawal_nominal += yearly_withdrawal[yearly_withdrawal_index].increase
            break
        }
        yearly_periods_add = 0
      }
      yearly_withdrawal.push({
        date: `${next_yearly_withdrawal_date_y}-${next_yearly_withdrawal_date_m}-${next_yearly_withdrawal_date_d}`,
        nominal: yearly_withdrawal_nominal,
        increase_type: yearly_withdrawal[yearly_withdrawal_index].increase_type,
        increase: yearly_withdrawal[yearly_withdrawal_index].increase,
        periods: yearly_withdrawal[yearly_withdrawal_index].periods,
        periods_add: yearly_periods_add
      })
    }


    if (withdrawals > 0) {
      let withdraw_nominal = 0
      if (withdrawals >= 100000000) {
        withdraw_nominal = 100000000
        withdrawals -= 100000000
      } else {
        withdraw_nominal = withdrawals
        withdrawals -= withdrawals
      }
      let fee = parseFloat(((withdraw_nominal / selling_price) * (selling_fee / 100)).toFixed(3))
      let edccash = parseFloat((withdraw_nominal / selling_price).toFixed(3)) + fee
      saldo = saldo - edccash
      progress.data.push({
        type: 'WITHDRAW',
        fee: fee,
        nominal: withdraw_nominal,
        edccash: parseFloat(edccash.toFixed(3))
      })
      saldo = parseFloat(saldo.toFixed(3))
    }

    if (progress.data.length > 0 && i >= start_show_results_index) {
      progress.data.push({
        type: 'MAXIMUM_WITHDRAWAL',
        nominal: parseFloat((saldo - (4000000 / purchase_price) - (selling_fee / 100 * saldo)).toFixed(3)) * selling_price
      })
      progress.data.push({
        type: 'SALDO_TOTAL',
        edccash: parseFloat(saldo.toFixed(3))
      })
      progress.date = current_date
      progress.saldo = parseFloat(saldo.toFixed(3))
      results.push(progress)
    }
  }

  return results
}