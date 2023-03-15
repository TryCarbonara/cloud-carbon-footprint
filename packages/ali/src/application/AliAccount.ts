/*
 * © 2023 Thoughtworks, Inc.
 */

import {
  CloudProviderAccount,
  ComputeEstimator,
  EmbodiedEmissionsEstimator,
  MemoryEstimator,
  NetworkingEstimator,
  StorageEstimator,
  UnknownEstimator,
} from '@cloud-carbon-footprint/core'
import {
  EstimationResult,
  GroupBy,
  Logger,
} from '@cloud-carbon-footprint/common'
import AliCostAndUsageService from '../lib/AliCostAndUsageService'
import { ALI_CLOUD_CONSTANTS } from '../domain'

export default class AliAccount extends CloudProviderAccount {
  private readonly credentials: any
  private logger: Logger

  constructor() {
    super()
    this.logger = new Logger('ALIAccount')
  }

  async getDataForRegions(
    startDate: Date,
    endDate: Date,
    grouping: GroupBy,
  ): Promise<EstimationResult[]> {
    this.logger.info(
      `startDate: ${startDate}, endDate: ${endDate}, grouping: ${grouping}`,
    )
    return null
  }

  getDataFromCostAndUsageReports(
    startDate: Date,
    endDate: Date,
    grouping: GroupBy,
  ): Promise<EstimationResult[]> {
    this.logger.info(
      `startDate: ${startDate}, endDate: ${endDate}, grouping: ${grouping}`,
    )

    const aliCostAndUsageService = new AliCostAndUsageService(
      new ComputeEstimator(),
      new StorageEstimator(ALI_CLOUD_CONSTANTS.SSDCOEFFICIENT),
      new StorageEstimator(ALI_CLOUD_CONSTANTS.HDDCOEFFICIENT),
      new NetworkingEstimator(ALI_CLOUD_CONSTANTS.NETWORKING_COEFFICIENT),
      new MemoryEstimator(ALI_CLOUD_CONSTANTS.MEMORY_COEFFICIENT),
      new UnknownEstimator(ALI_CLOUD_CONSTANTS.ESTIMATE_UNKNOWN_USAGE_BY),
      new EmbodiedEmissionsEstimator(
        ALI_CLOUD_CONSTANTS.SERVER_EXPECTED_LIFESPAN,
      ),
    )
    return aliCostAndUsageService.getEstimates(startDate, endDate, grouping)
  }
}
